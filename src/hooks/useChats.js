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
  return { __raw: text }; // HTML/텍스트 응답은 __raw로 반환
}

function pickAssistantText(data) {
  return data?.message
      || data?.response
      || data?.answer
      || data?.content
      || data?.formatted_message
      || data?.final_quote?.formatted_message
      || null;
}

// 백엔드가 내려줄 수 있는 HTML 키 후보들을 안전하게 추출
function pickAssistantHtml(data) {
  return data?.html
      || data?.rendered_html
      || data?.formatted_html
      || data?.message_html
      || data?.final_quote?.formatted_html
      || null;
}

function getParam(name) {
  try { return new URLSearchParams(window.location.search).get(name); }
  catch { return null; }
}

// ---------- hook ----------
export default function useChats(options = {}) {
  const sidFromUrl = typeof window !== "undefined" ? getParam("session_id") : null;
  const categoryFromUrl = typeof window !== "undefined" ? getParam("category") : null;

  const category = options.category || categoryFromUrl || "";
  const fresh = options.ignoreStoredSession ?? false;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(() => {
    if (fresh) return null;
    return sidFromUrl || localStorage.getItem(SESSION_KEY);
  });

  const creatingRef = useRef(false);
  const lastCategoryRef = useRef(category);

  // 메시지 추가 유틸: html 우선, 없으면 text
  const pushAssistant = ({ html, text }) => {
    if (html) {
      setMessages(prev => [...prev, { role: "assistant", html }]);
    } else if (text) {
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    }
  };

  useEffect(() => {
    if (!fresh && sidFromUrl) localStorage.setItem(SESSION_KEY, sidFromUrl);
  }, [fresh, sidFromUrl]);

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

  // 세션 생성
  useEffect(() => {
    if (sessionId || creatingRef.current || sidFromUrl) return;

    if (!category) {
      setError("카테고리 정보가 없어 대화를 시작할 수 없어요.");
      setMessages(prev => [...prev, { role: "assistant", content: "카테고리를 먼저 선택해주세요." }]);
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

  // 최종견적 조회 → 백엔드가 보내는 포맷 그대로 보여주기
  const showFinalQuote = async (sid) => {
    try {
      const r = await fetch(`${API_BASE}/chat/quote/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ session_id: sid }),
        credentials: "include",
      });
      const ct = r.headers.get("content-type") || "";
      const j = await parseSafe(r);
      if (!r.ok) throw new Error(j?.detail || j?.__raw || "최종 견적 조회 실패");

      if (ct.includes("text/html")) {
        // 백엔드가 HTML 단독으로 내려주는 경우
        pushAssistant({ html: j.__raw || "" });
      } else {
        // JSON일 때, 우선 HTML 필드 사용 → 없으면 텍스트 필드 사용
        const html = pickAssistantHtml(j);
        const text = pickAssistantText(j);
        if (html || text) pushAssistant({ html, text });
        else pushAssistant({ text: "최종 견적 정보를 찾을 수 없습니다." });

        // 추천 인쇄소는 다른 섹션에서 쓸 수 있으니 저장만 유지
        const fq = j?.final_quote;
        if (fq) {
          localStorage.setItem("oneq_recommendations", JSON.stringify(fq.recommendations || []));
          localStorage.setItem("oneq_final_quote_obj", JSON.stringify(fq));
        }
      }

      setLastResponse(prev => ({ ...(prev || {}), action: "quote" }));
    } catch (e) {
      pushAssistant({ text: e.message || "최종 견적 조회 실패" });
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

      // history가 오면 그대로 반영(백엔드가 포맷을 이미 조절했다고 가정)
      if (Array.isArray(data.history) && data.history.length) {
        const mapped = data.history
          .filter(m => m?.role && (m?.content || m?.html))
          .map(m => ({
            role: m.role,
            ...(m.html ? { html: String(m.html) } : { content: String(m.content) }),
          }));
        setMessages(mapped);
      } else {
        const html = pickAssistantHtml(data);
        const text = pickAssistantText(data) || "처리 결과를 이해하지 못했어요. 잠시 후 다시 시도해주세요.";
        pushAssistant({ html, text });
      }

      // 견적 액션이면 백엔드 포맷으로 그대로 표출
      if (data?.action === "quote") {
        const html = pickAssistantHtml(data);
        const text = pickAssistantText(data);

        if (html || text) {
          pushAssistant({ html, text });
        } else {
          await showFinalQuote(sessionId);
        }
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
