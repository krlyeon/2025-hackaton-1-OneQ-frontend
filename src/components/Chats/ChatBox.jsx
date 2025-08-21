// src/components/Chats/ChatBox.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useChat from "../../hooks/useChats"; 
import C from "../Chats/ChatBox.styles.js";
import SendIcon from "../../assets/ChatBot/send.svg";

export default function ChatBox() {
    const { state } = useLocation();                        
    const category = state?.category || "";           

    const { messages, send, sendChoice, loading, lastResponse } =
        useChat({ ignoreStoredSession: true, category }); 

    const [text, setText] = useState("");
    const askMode = lastResponse?.type === "ask";
    const choices = lastResponse?.choices || [];
    const scrollRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const v = text.trim();
        if (!v || loading) return;
        send(v);
        setText("");
    };

    // 로딩에 변화가 있는 경우 맨 아래로 스크롤
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, loading, choices.length]);

    return (
        <C.ChatContainer>
        <C.ChatWindow ref={scrollRef}>
            {messages.map((m, i) => (
            <C.MessageRow key={i} role={m.role}>
                <C.Bubble role={m.role}>{m.content}</C.Bubble>
            </C.MessageRow>
            ))}

            {askMode && choices.length > 0 && (
            <C.ChoicesContainer>
                {choices.map((c, idx) => (
                <C.ChoiceButton
                    key={`${idx}-${String(c)}`} 
                    type="button"
                    onClick={() => {
                    const v = String(c);
                    if (loading) return;
                    setText(v);
                    send(v);
                    setText("");
                    }}
                >
                    {c}
                </C.ChoiceButton>
                ))}
            </C.ChoicesContainer>
            )}
            {loading && <C.LoadingText>생각중…</C.LoadingText>}
        </C.ChatWindow>
        <C.ChatForm onSubmit={onSubmit}>
            <C.ChatInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="채팅을 입력해주세요"
            />
            <C.ChatButton type="submit" disabled={loading || !text.trim()}>
            <img src={SendIcon} alt="Send" />
            </C.ChatButton>
        </C.ChatForm>
        </C.ChatContainer>
    );
}