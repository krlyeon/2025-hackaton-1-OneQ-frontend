// src/components/Chats/ChatBox.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useChats from "../../hooks/useChats";
import C from "../Chats/ChatBox.styles.js";
import SendIcon from "../../assets/ChatBot/send.svg";

export default function ChatBox() {
  // 1) 라우터 훅은 최상위에서 고정 순서로
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // 2) 파생값은 useMemo (훅 아님 → 순서에 영향 X)
  const category = useMemo(() => {
    return (location?.state && location.state.category) || searchParams.get("category") || "";
  }, [location?.state, searchParams]);

  // 3) 세션 재사용 여부 (지금 true라 "항상 새 세션"입니다)
  const { messages, send, sendChoice, loading, lastResponse, sessionId } =
    useChats({ ignoreStoredSession: true, category });

  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // 4) choices 호환 처리
  const choices = useMemo(() => {
    const a = Array.isArray(lastResponse?.choices) ? lastResponse.choices : [];
    const b = Array.isArray(lastResponse?.next_questions) ? lastResponse.next_questions : [];
    return a.length ? a : b;
  }, [lastResponse]);
  const askMode = choices.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v || loading) return;
    send(v);
    setText("");
  };

  // 5) 새 메시지/로딩 변화마다 스크롤 맨 아래
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, choices.length]);

  return (
    <C.ChatContainer>
      <C.ChatWindow ref={scrollRef}>
        {/* 디버그가 필요하면 주석 해제
        <div style={{ fontSize: 12, color: "#999", margin: "8px 12px" }}>
          session_id: {sessionId || "(없음)"} / category: {category || "(없음)"}
        </div>
        */}
        {messages.map((m, i) => (
          <C.MessageRow key={i} role={m.role}>
            {"html" in m && m.html
              ? <C.Bubble role={m.role} dangerouslySetInnerHTML={{ __html: m.html }} />
              : <C.Bubble role={m.role}>{m.content}</C.Bubble>}
          </C.MessageRow>
        ))}

        {askMode && (
          <C.ChoicesContainer>
            {choices.map((c, idx) => (
              <C.ChoiceButton
                key={`${idx}-${String(c)}`}
                type="button"
                onClick={() => {
                  if (loading) return;
                  const v = String(c);
                  setText(v);
                  // sendChoice를 써도 되고, send를 써도 결과는 동일
                  sendChoice(v);
                  setText("");
                }}
              >
                {String(c)}
              </C.ChoiceButton>
            ))}
          </C.ChoicesContainer>
        )}

        {loading && <C.LoadingText>생성 중…</C.LoadingText>}
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
