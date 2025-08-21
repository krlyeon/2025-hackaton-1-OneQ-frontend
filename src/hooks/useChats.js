// src/hooks/useChats.js
import { useEffect, useRef, useState } from "react";

const API_BASE =
    (import.meta.env.VITE_API_BASE?.replace(/\/$/, ""));
const SESSION_KEY = "oneq_server_session_id";

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

    // 세션 생성
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
            //console.log("[useChats] create session payload:", payload);

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

        try {
        if (!sessionId) throw new Error("대화가 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.");

        const res = await fetch(`${API_BASE}/chat/sessions/${encodeURIComponent(sessionId)}/send/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: v }),
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
        } catch (e) {
        console.error(e);
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
