// src/components/Chats/ChatBox.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useChats from "../../hooks/useChats";
import C from "../Chats/ChatBox.styles.js";
import SendIcon from "../../assets/ChatBot/send.svg";

export default function ChatBox() {
  // 1) 라우터 state + URL 쿼리 모두 지원
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const categoryFromState = state?.category || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const category = categoryFromState || categoryFromUrl || "";

  // 2) 세션 재사용: ignoreStoredSession=false
  const { messages, send, sendChoice, loading, lastResponse, sessionId } =
    useChats({ ignoreStoredSession: true, category });

  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // 3) choices 호환 처리 (없으면 빈 배열)
  const choices =
    (Array.isArray(lastResponse?.choices) && lastResponse.choices) ||
    (Array.isArray(lastResponse?.next_questions) && lastResponse.next_questions) ||
    [];
  const askMode = choices.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v || loading) return;
    send(v);
    setText("");
  };

  // 4) 새 메시지/로딩 변화마다 스크롤 맨 아래
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, choices.length]);

  return (
    <C.ChatContainer>
      <C.ChatWindow ref={scrollRef}>
        {/* 필요시 디버깅:
        <div style={{ fontSize: 12, color: "#999", margin: "8px 12px" }}>
          session_id: {sessionId || "(없음)"} / category: {category || "(없음)"}
        </div>
        */}
        {messages.map((m, i) => (
          <C.MessageRow key={i} role={m.role}>
            <C.Bubble role={m.role}>{m.content}</C.Bubble>
          </C.MessageRow>
        ))}

        {askMode && (
          <C.ChoicesContainer>
            {choices.map((c, idx) => (
              <C.ChoiceButton
                key={`${idx}-${String(c)}`}
                type="button"
                onClick={() => {
                  const v = String(c);
                  if (loading) return;
                  setText(v);
                  // sendChoice가 별도 로직이면 교체 가능. 기본은 send와 동일.
                  send(v);
                  setText("");
                }}
              >
                {String(c)}
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
