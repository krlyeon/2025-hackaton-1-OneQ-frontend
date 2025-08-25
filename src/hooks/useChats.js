// src/hooks/useChats.js
import { useEffect, useRef, useState } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE?.replace(/\/$/, ""));
const SESSION_KEY = "oneq_server_session_id";

const NUM = (v) => {
  if (v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^\d.+-]/g, "")); // "90점", "38" 등 숫자만 뽑기
  return Number.isFinite(n) ? n : null;
};
const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
const coalesce = (...args) => args.find(v => v !== undefined && v !== null);

/** ⬇️ [추가] 인쇄소 단건 정규화: 필드명 변형/누락 보정 + oneq_score 계산 */
function normalizeShop(raw = {}) {
  const name   = coalesce(raw.name, raw.title, raw.shop_name) || "이름 미상";
  const phone  = coalesce(raw.phone, raw.tel, raw.contact) || "";
  const email  = coalesce(raw.email, raw.mail) || "";
  const address= coalesce(raw.address, raw.addr, raw.location) || "";
  const reason = coalesce(raw.recommendation_reason, raw.reason, raw.desc) || "";

  // 부분 점수(문자/숫자 섞여도 NUM으로 정리)
  const price   = NUM(coalesce(raw.price_score, raw.priceScore));
  const deadline= NUM(coalesce(raw.deadline_score, raw.deadlineScore, raw.time_score));
  const workfit = NUM(coalesce(raw.workfit_score, raw.workfitScore, raw.quality_score));

  // 총점 (서버가 주면 우선, 없으면 가중 평균으로 산출)
  let oneq = NUM(coalesce(raw.oneq_score, raw.oneqScore));
  if (!Number.isFinite(oneq)) {

    const w = { price: 0.40, deadline: 0.30, workfit: 0.30 };
    let sum = 0, weight = 0;
    if (Number.isFinite(price))   { sum += price   * w.price;   weight += w.price; }
    if (Number.isFinite(deadline)){ sum += deadline* w.deadline;weight += w.deadline; }
    if (Number.isFinite(workfit)) { sum += workfit * w.workfit; weight += w.workfit; }
    if (weight > 0) oneq = Math.round(clamp(sum / weight, 0, 100));
  }

  return {
    // 원본 보존
    ...raw,
    // 정규화된 공통 필드
    name, phone, email, address, recommendation_reason: reason,
    price_score: Number.isFinite(price) ? price : null,
    deadline_score: Number.isFinite(deadline) ? deadline : null,
    workfit_score: Number.isFinite(workfit) ? workfit : null,
    oneq_score: Number.isFinite(oneq) ? oneq : null,
  };
}


function normalizeFinalQuotePayload(data = {}) {
  const quote = data.final_quote_data || data.quote_info || {};
  const shops = Array.isArray(data.recommended_shops) ? data.recommended_shops : [];

  const normalizedShops = shops.map(normalizeShop)
    .sort((a, b) => (b.oneq_score ?? -1) - (a.oneq_score ?? -1))
    .slice(0, 3);

  return {
    is_final_quote: !!data.is_final_quote,
    final_quote_data: quote,
    recommended_shops_normalized: normalizedShops,
  };
}

async function parseSafe(res) {
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (ct.includes("application/json")) {
    try { return JSON.parse(text); } catch {}
  }
  return { __raw: text };
}

function pickAssistantText(data) {
  return data?.response || data?.answer || data?.message || data?.content || null;
}

export default function useChats(options = {}) {
  const category = options.category || "";
  const fresh = options.ignoreStoredSession ?? false;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(
    () => (fresh ? null : localStorage.getItem(SESSION_KEY))
  );

  // ⬇️ [추가] 대기 안내 상태
  const [progressHint, setProgressHint] = useState(null);
  const [waitMs, setWaitMs] = useState(0);

  const creatingRef = useRef(false);
  const lastCategoryRef = useRef(category);

  useEffect(() => {
    const changed = lastCategoryRef.current !== category;
    if (fresh || changed) {
      lastCategoryRef.current = category;
      localStorage.removeItem(SESSION_KEY);
      setSessionId(null);
      setMessages([]);
      setLastResponse(null);
      setError(null);
    }
  }, [fresh, category]);

  // 세션 생성 (동일)
  useEffect(() => {
    if (sessionId || creatingRef.current) return;

    if (!category) {
      setError("카테고리 정보가 없어 대화를 시작할 수 없어요.");
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "카테고리를 먼저 선택해주세요." },
      ]);
      return;
    }

    creatingRef.current = true;
    (async () => {
      try {
        const payload = { category };
        const res = await fetch(`${API_BASE}/chat/sessions/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await parseSafe(res);
        if (!res.ok) {
          console.error("[useChats] create session 500 body:", data);
          throw new Error(data?.detail || data?.error || data?.__raw || "세션 생성 실패");
        }

        const sid = data?.session_id || data?.id;
        if (!sid) throw new Error("세션 ID가 응답에 없습니다.");
        localStorage.setItem(SESSION_KEY, sid);
        setSessionId(sid);

        if (Array.isArray(data.history) && data.history.length) {
          const mapped = data.history
            .filter(m => m?.role && m?.content)
            .map(m => ({ role: m.role, content: String(m.content) }));
          setMessages(mapped);
        } else {
          const intro = data?.intro || data?.greeting || "안녕하세요! 인쇄 제작 전문 챗봇입니다.";
          const firstQ = data?.first_question || data?.question || "";
          const first = [intro, firstQ].filter(Boolean).join("\n\n");
          setMessages(first ? [{ role: "assistant", content: first }] : []);
        }

        setLastResponse({ type: "intro", prompter: data?.prompter || null });
      } catch (e) {
        console.error(e);
        setError(e.message || "세션 생성 실패");
        setMessages([{ role: "assistant", content: "대화 준비 중 문제가 발생했어요. 새로고침 후 다시 시도해주세요." }]);
      } finally {
        creatingRef.current = false;
      }
    })();
  }, [sessionId, category]);

  // 메시지 전송
  const send = async (userText) => {
    const v = userText?.trim();
    if (!v) return;
    setMessages(prev => [...prev, { role: "user", content: v }]);
    setLoading(true);
    setError(null);

    const start = Date.now();
    const i = setInterval(() => setWaitMs(Date.now() - start), 500);
    const slow = setTimeout(() => {
      setProgressHint("인쇄소 추천을 준비 중입니다… 보통 3~8초 정도 소요돼요.");
    }, 3000);
    const verySlow = setTimeout(() => {
      setProgressHint("데이터 분석이 길어지고 있어요. 곧 리포트를 띄울게요!");
    }, 12000);

    try {
      if (!sessionId) throw new Error("대화가 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.");

      const res = await fetch(`${API_BASE}/chat/sessions/${encodeURIComponent(sessionId)}/send/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: v }),
      });
      const data = await parseSafe(res);

      // ⬇️ [추가] 최종견적 정규화 결과를 lastResponse에 같이 보관
      const normalized = normalizeFinalQuotePayload(data);
      setLastResponse({ ...data, _normalized: normalized });

      if (!res.ok) {
        throw new Error(data?.detail || data?.error || data?.__raw || "메시지 전송 실패");
      }

      if (Array.isArray(data.history) && data.history.length) {
        const mapped = data.history
          .filter(m => m?.role && m?.content)
          .map(m => ({ role: m.role, content: String(m.content) }));
        setMessages(mapped);
      } else {
        const display = pickAssistantText(data) || "처리 결과를 이해하지 못했어요. 잠시 후 다시 시도해주세요.";
        setMessages(prev => [...prev, { role: "assistant", content: display }]);
      }
    } catch (e) {
      console.error(e);
      const msg = e.message || "서버 통신 오류가 발생했어요.";
      setError(msg);
      setMessages(prev => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
      clearInterval(i);
      clearTimeout(slow);
      clearTimeout(verySlow);
      setWaitMs(0);
      setProgressHint(null);
    }
  };

  const sendChoice = async (choiceText) => send(choiceText);

  const normalizedShops =
    lastResponse?._normalized?.recommended_shops_normalized || [];

  return {
    messages, send, sendChoice, loading, error, lastResponse, sessionId,
    progressHint, waitMs, normalizedShops
  };
}