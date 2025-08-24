// src/hooks/useChats.js
import { useEffect, useRef, useState } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

// ---------- utils ----------
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

function getParam(name) {
  try { return new URLSearchParams(window.location.search).get(name); }
  catch { return null; }
}

function toKR(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toLocaleString("ko-KR") : String(v ?? "-");
}

// 견적(주문 요약/가격대)만 텍스트 구성
function buildQuoteOnlyText(fq) {
  if (!fq) return "";
  const {
    quote_number,
    created_date,
    category,
    slots = {},
    total_available,
    price_range,
    order_summary = {},
  } = fq;

  const L = [
    `${category || "인쇄"} 최종 견적`,
    "==============================================",
    quote_number ? `견적번호: ${quote_number}` : "",
    created_date ? `생성일: ${created_date}` : "",
    "",
    "주문 정보:",
    `• 수량: ${slots.quantity ? `${slots.quantity}부` : order_summary.quantity || "-"}`,
    `• 사이즈: ${slots.size || order_summary.size || "-"}`,
    `• 용지: ${slots.paper || order_summary.paper || "-"}`,
    `• 코팅: ${slots.coating || order_summary.coating || "-"}`,
    `• 납기: ${slots.due_days ? `${slots.due_days}일` : order_summary.due_days || "-"}`,
    `• 예산: ${slots.budget ? `${toKR(slots.budget)}원` : order_summary.budget || "-"}`,
    `• 지역: ${order_summary.region || "-"}`,
    "",
    total_available != null ? `견적 가능 인쇄소: ${total_available}곳` : "",
    price_range ? `가격대: ${price_range}` : "",
  ].filter(Boolean);

  return L.join("\n");
}

// 추천 인쇄소 TOP3 텍스트 구성 (FIX)
function buildRecommendationsText(fq) {
  const recs = Array.isArray(fq?.recommendations) ? fq.recommendations : [];
  if (!recs.length) return "";
  const top = recs.slice(0, 3);

  const lines = [
    "추천 인쇄소 TOP3",
    "------------------------------",
    ...top.map((r, i) => {
      const parts = [];

      // 이름 + 인증표시
      const name = r.printshop_name || r.shop_name || "-";
      parts.push(`${i + 1}위. ${name}` + (r.is_verified ? " (인증)" : ""));

      // 점수/이유
      if (r.recommendation_score != null) parts.push(`   추천 점수: ${r.recommendation_score}점`);
      if (r.recommendation_reason)        parts.push(`   추천 이유: ${r.recommendation_reason}`);

      // 연락처/주소/이메일 (폴백까지)
      const phone   = r.printshop_phone   || r.phone;
      const address = r.printshop_address || r.address;
      const email   = r.printshop_email   || r.email;
      if (phone)   parts.push(`   연락처: ${phone}`);
      if (address) parts.push(`   주소: ${address}`);
      if (email)   parts.push(`   이메일: ${email}`);

      // 기타 정보
      if (r.total_price != null)  parts.push(`   총액: ${toKR(r.total_price)}원`);
      if (r.production_time)      parts.push(`   제작기간: ${r.production_time}`);
      if (r.delivery_options)     parts.push(`   배송: ${r.delivery_options}`);

      return parts.join("\n");
    }),
  ];

  return lines.join("\n");
}


// 메시지/슬롯로 “견적 생성 가능” 시점 감지 (백업 트리거)
function shouldTriggerQuote(resp) {
  const lastMsg =
    Array.isArray(resp?.history) && resp.history.length
      ? String(resp.history[resp.history.length - 1]?.content || "")
      : "";
  const slots = resp?.slots || {};
  const msgSignal = /모든 정보가 수집되었습니다|최종 견적/.test(lastMsg);
  const slotSignal = !!slots?.budget; // 예산까지 수집되면 견적 가능
  return msgSignal || slotSignal;
}

// ---------- hook ----------
export default function useChats(options = {}) {
  const sidFromUrl = typeof window !== "undefined" ? getParam("session_id") : null;
  const categoryFromUrl = typeof window !== "undefined" ? getParam("category") : null;

  const category = options.category || categoryFromUrl || "";
  const fresh = options.ignoreStoredSession ?? false; // 항상 새 세션이면 true로 사용

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(() => {
    // 항상 새 세션(start fresh)일 때는 URL/localStorage 무시
    if (fresh) return null;
    return sidFromUrl || localStorage.getItem(SESSION_KEY);
  });

  const creatingRef = useRef(false);
  const lastCategoryRef = useRef(category);

  // URL로 받은 세션을 저장 (fresh 모드에선 저장하지 않음)
  useEffect(() => {
    if (!fresh && sidFromUrl) localStorage.setItem(SESSION_KEY, sidFromUrl);
  }, [fresh, sidFromUrl]);

  // category 변경 혹은 fresh 모드에서 세션 리셋
  useEffect(() => {
    const changed = lastCategoryRef.current !== category;
    if (fresh || (changed && !sidFromUrl)) {
      lastCategoryRef.current = category;
      localStorage.removeItem(SESSION_KEY);
      setSessionId(null);
      setMessages([]);
      setLastResponse(null);
      setError(null);
    }
  }, [fresh, category, sidFromUrl]);

  // 세션 생성 (URL sid가 있으면 스킵)
  useEffect(() => {
    if (sessionId || creatingRef.current || sidFromUrl) return;

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
        const res = await fetch(`${API_BASE}/chat/sessions/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category }),
          credentials: "include",
        });
        const data = await parseSafe(res);
        if (!res.ok) throw new Error(data?.detail || data?.error || data?.__raw || "세션 생성 실패");

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

        setLastResponse({ type: "intro" });
      } catch (e) {
        setError(e.message || "세션 생성 실패");
        setMessages([{ role: "assistant", content: "대화 준비 중 문제가 발생했어요. 새로고침 후 다시 시도해주세요." }]);
      } finally {
        creatingRef.current = false;
      }
    })();
  }, [sessionId, category, sidFromUrl]);

  // 최종견적 조회 → 채팅에 붙이기 (견적 + 추천 인쇄소)
  const showFinalQuote = async (sid) => {
    try {
      const r = await fetch(`${API_BASE}/chat/quote/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ session_id: sid }),
        credentials: "include",
      });
      const j = await parseSafe(r);
      if (!r.ok) throw new Error(j?.detail || j?.__raw || "최종 견적 조회 실패");

      const fq = j?.final_quote;
      const baseText = buildQuoteOnlyText(fq) || fq?.formatted_message || "최종 견적 정보를 찾을 수 없습니다.";
      const recText  = buildRecommendationsText(fq);
      const txt      = [baseText, recText].filter(Boolean).join("\n\n");

      // 스코어/다른 섹션에서 재사용
      localStorage.setItem("oneq_final_quote", txt);
      localStorage.setItem("oneq_final_quote_obj", JSON.stringify(fq || {}));
      localStorage.setItem("oneq_recommendations", JSON.stringify(fq?.recommendations || []));

      setMessages(prev => [...prev, { role: "assistant", content: txt }]);
      setLastResponse(prev => ({ ...(prev || {}), action: "quote", final_quote: fq }));
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: e.message || "최종 견적 조회 실패" }]);
    }
  };

  // 메시지 전송
  const send = async (userText) => {
    const v = userText?.trim();
    if (!v) return;
    setMessages(prev => [...prev, { role: "user", content: v }]);
    setLoading(true);
    setError(null);

    try {
      if (!sessionId) throw new Error("대화가 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.");

      const res = await fetch(`${API_BASE}/chat/sessions/${encodeURIComponent(sessionId)}/send/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: v }),
        credentials: "include",
      });
      const data = await parseSafe(res);
      setLastResponse(data);

      if (!res.ok) throw new Error(data?.detail || data?.error || data?.__raw || "메시지 전송 실패");

      if (Array.isArray(data.history) && data.history.length) {
        const mapped = data.history
          .filter(m => m?.role && m?.content)
          .map(m => ({ role: m.role, content: String(m.content) }));
        setMessages(mapped);
      } else {
        const display = pickAssistantText(data) || "처리 결과를 이해하지 못했어요. 잠시 후 다시 시도해주세요.";
        setMessages(prev => [...prev, { role: "assistant", content: display }]);
      }

      // 명시 action 처리
      if (data?.action === "quote") {
        if (data?.final_quote) {
          const baseText = buildQuoteOnlyText(data.final_quote) || data.final_quote.formatted_message || "";
          const recText  = buildRecommendationsText(data.final_quote);
          const txt      = [baseText, recText].filter(Boolean).join("\n\n");

          localStorage.setItem("oneq_final_quote", txt);
          localStorage.setItem("oneq_final_quote_obj", JSON.stringify(data.final_quote));
          localStorage.setItem("oneq_recommendations", JSON.stringify(data.final_quote?.recommendations || []));

          setMessages(prev => [...prev, { role: "assistant", content: txt || "최종 견적 정보를 찾을 수 없습니다." }]);
          setLastResponse(prev => ({ ...(prev || {}), action: "quote", final_quote: data.final_quote }));
        } else {
          await showFinalQuote(sessionId);
        }
      }
      // 백업 트리거
      else if (shouldTriggerQuote(data)) {
        await showFinalQuote(sessionId);
      }
    } catch (e) {
      const msg = e.message || "서버 통신 오류가 발생했어요.";
      setError(msg);
      setMessages(prev => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const sendChoice = async (choiceText) => send(choiceText);

  return { messages, send, sendChoice, loading, error, lastResponse, sessionId };
}
