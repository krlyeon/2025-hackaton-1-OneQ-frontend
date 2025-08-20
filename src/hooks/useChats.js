// src/hooks/useChat.js
import { useEffect, useRef, useState } from "react";

const RAW_BASE = import.meta.env.VITE_API_BASE || "";
const API_BASE = RAW_BASE.endsWith("/") ? RAW_BASE : RAW_BASE + "/";

// 안전 파서 (HTML 에러 페이지 등 방어)
async function parseSafe(res) {
    const ct = res.headers.get("content-type") || "";
    const text = await res.text();
    if (ct.includes("application/json")) {
        try { return JSON.parse(text); } catch {}
    }
    return { __raw: text };
}

// 서버 응답에서 보여줄 텍스트만 추출
function pickAssistantText(data) {
    if (!data) return null;
    if (data.response) return data.response;
    if (data.answer)   return data.answer;
    if (data.message)  return data.message;
    if (data.content)  return data.content;

    if (Array.isArray(data.history)) {
        const lastAssistant = [...data.history].reverse()
        .find(m => m?.role === "assistant" && m?.content);
        if (lastAssistant?.content) return lastAssistant.content;
    }
    return null;
    }

    // ✅ 옵션: ignoreStoredSession 이 true면 항상 새 세션 시작
    export default function useChat(options = {}) {
    const ignoreStored = options.ignoreStoredSession ?? false;

    const [messages, setMessages] = useState([
        { role: "assistant", content: "안녕하세요! 어떤 인쇄물을 제작하시나요?" },
    ]);
    const [loading, setLoading] = useState(false);
    const [lastResponse, setLastResponse] = useState(null);
    const [error, setError] = useState(null);

    const [sessionId, setSessionId] = useState(() =>
        ignoreStored ? null : localStorage.getItem("oneq_server_session_id")
    );
    const creatingRef = useRef(false);

    // 옵션이 "항상 새 세션"이면 기존 세션을 즉시 제거
    useEffect(() => {
        if (ignoreStored) {
        localStorage.removeItem("oneq_server_session_id");
        setSessionId(null); // 트리거 → 아래 effect가 새 세션 생성
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ignoreStored]);

    // 세션 생성
    useEffect(() => {
        if (sessionId || creatingRef.current) return;
        creatingRef.current = true;

        (async () => {
        try {
            const res = await fetch(`${API_BASE}chat/sessions/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await parseSafe(res);

            const sid = data?.id || data?.session_id;
            if (!sid) throw new Error("세션 ID가 응답에 없습니다.");

            localStorage.setItem("oneq_server_session_id", sid);
            setSessionId(sid);
        } catch (e) {
            console.error("세션 생성 실패:", e);
            setError("세션 생성 실패");
            setMessages(prev => [
            ...prev,
            { role: "assistant", content: "대화 준비 중 문제가 발생했어요. 새로고침 후 다시 시도해주세요." },
            ]);
        } finally {
            creatingRef.current = false;
        }
        })();
    }, [sessionId]);

    // 메시지 전송
    const send = async (userText) => {
        if (!userText?.trim()) return;
        setMessages(prev => [...prev, { role: "user", content: userText }]);
        setLoading(true);
        setError(null);

        try {
        if (!sessionId) throw new Error("대화가 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.");

        const url = `${API_BASE}chat/sessions/${encodeURIComponent(sessionId)}/send/`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
        });

        if (res.status === 404) {
            localStorage.removeItem("oneq_server_session_id");
            setSessionId(null);
            throw new Error("대화가 만료되었어요. 새 대화를 만들고 다시 시도해주세요.");
        }

        const data = await parseSafe(res);
        setLastResponse(data);

        if (!res.ok) {
            const detail = data?.detail || data?.error || data?.__raw || "알 수 없는 서버 오류";
            throw new Error(`서버 오류: ${detail}`);
        }

        const display =
            (data?.type === "ask" ? (data.question || pickAssistantText(data)) : pickAssistantText(data))
            || "처리 결과를 이해하지 못했어요. 잠시 후 다시 시도해주세요.";

        setMessages(prev => [...prev, { role: "assistant", content: display }]);
        } catch (e) {
        console.error(e);
        const msg = e.message || "서버 통신 오류가 발생했어요.";
        setError(msg);
        setMessages(prev => [...prev, { role: "assistant", content: msg }]);
        } finally {
        setLoading(false);
        }
    };

    const sendChoice = async (choiceText) => {
        await send(choiceText);
    };

    return { messages, send, sendChoice, loading, error, lastResponse, sessionId };
}
