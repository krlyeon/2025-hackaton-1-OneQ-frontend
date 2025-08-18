// src/hooks/useChat.js
import { useEffect, useMemo, useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

function getOrCreateSessionId() {
    const key = "oneq_session_id"
    let v = localStorage.getItem(key)
    if (!v) {
        v = Math.random().toString(36).slice(2) // 간단 UUID 대체
        localStorage.setItem(key, v)
    }
    return v
}

export default function useChat() {
    const sessionId = useMemo(getOrCreateSessionId, [])
    const [messages, setMessages] = useState([
        { role: "assistant", content: "안녕하세요! 어떤 인쇄물을 제작하시나요?" },
    ])
    const [loading, setLoading] = useState(false)
    const [lastResponse, setLastResponse] = useState(null) // type/choices/question 등 저장
    const [error, setError] = useState(null)

    const send = async (userText) => {
        if (!userText?.trim()) return
        setMessages(prev => [...prev, { role: "user", content: userText }])
        setLoading(true)
        setError(null)

        try {
        const res = await fetch(`${API_BASE}chat/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            message: userText,      // ← 오타 방지 위해 message 사용
            session_id: sessionId,  // ← 세션 유지
            }),
        })

        const data = await res.json()
        setLastResponse(data)

        // 서버가 질문하는 형태(type: "ask")면 question을 그대로 보여주고,
        // 답을 바로 주는 형태(type: "answer")면 그 텍스트를 assistant 메시지로 추가.
        if (data?.type === "ask") {
            const q = data.question || "추가 정보가 필요해요."
            setMessages(prev => [...prev, { role: "assistant", content: q }])
        } else {
            const text = data?.response || data?.answer || JSON.stringify(data)
            setMessages(prev => [...prev, { role: "assistant", content: text }])
        }
        } catch (e) {
        console.error(e)
        setError("서버 통신 오류")
        setMessages(prev => [...prev, { role: "assistant", content: "서버 통신 오류가 발생했어요." }])
        } finally {
        setLoading(false)
        }
    }

    // 선택지(choices) 클릭 지원
    const sendChoice = async (choiceText) => {
        await send(choiceText)
    }

    return { messages, send, sendChoice, loading, error, lastResponse }
}
