// src/sections/SecondScoreSection/index.jsx
import React, { useEffect, useState } from "react";
//import Background2 from "../../assets/Score/body2.svg";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");


const SESSION_KEY = "oneq_server_session_id";
function getParam(name) {
  try { return new URLSearchParams(window.location.search).get(name); }
  catch { return null; }
}
function getSessionId() {
  const fromUrl = getParam("session_id");
  if (fromUrl) {
    localStorage.setItem(SESSION_KEY, fromUrl);
    return fromUrl;
  }
  return localStorage.getItem(SESSION_KEY);
}

function toKR(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toLocaleString("ko-KR") : String(v ?? "-");
}


function buildQuoteWithoutRecs(fq) {
  if (!fq) return "";
  const {
    quote_number,
    created_date,
    category,
    total_available,
    price_range,
    order_summary = {},
    slots = {},
  } = fq;


  const quantity = slots.quantity ?? order_summary.quantity ?? "-";
  const size = slots.size ?? order_summary.size ?? "-";
  const paper = slots.paper ?? order_summary.paper ?? "-";
  const coating = slots.coating ?? order_summary.coating ?? "-";
  const due = slots.due_days ? `${slots.due_days}` : (order_summary.due_days ?? "-");
  const budget =
    slots.budget != null
      ? `${toKR(slots.budget)}`
      : (order_summary.budget ?? "-");
  const region = order_summary.region ?? "-";

  return [
    `견적번호  : ${quote_number || "-"}`,
    `생성일    : ${created_date || "-"}`,

    "",
    `───────────────── [주문 정보] ────────────────`,
    `• 카테고리 : ${category}`,
    `• 수량     : ${/부$/.test(String(quantity)) || quantity === "-" ? quantity : `${quantity}부`}`,
    `• 사이즈   : ${size}`,
    `• 용지     : ${paper}`,
    `• 코팅     : ${coating}`,
    `• 납기     : ${due}`,
    `• 예산     : ${budget}`,
    `• 지역     : ${region}`,
    
    ``,
    `────────────────── [요약] ──────────────────`,
    total_available != null ? `• 견적 가능 인쇄소 : ${total_available}곳` : null,
    price_range ? `• 가격대 : ${price_range}` : null,
  ]
  .filter(Boolean)
  .join("\n");
}

export default function SecondScoreSection() {
  const [text, setText] = useState("불러오는 중…");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const sid = getSessionId();
        if (!sid) {
          setError("완성된 견적서가 없습니다. 챗봇을 통해 견적서를 완성해주세요");
          setLoading(false);
          return;
        }

        // 최종 견적 조회: /chat/quote/ (슬래시 중요)
        const res = await fetch(`${API_BASE}/chat/quote/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ session_id: sid }),
          credentials: "include",
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`);

        const fq = json?.final_quote;
        // formatted_message는 추천 인쇄소가 들어갈 수 있으므로 사용하지 않음
        const msg =
          buildQuoteWithoutRecs(fq) ||
          json?.message ||
          "최종 견적서를 찾을 수 없습니다.";

        setText(msg);
      } catch (e) {
        setError(e.message || "요청 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <S.Container $bg={BG_URL}>
      <S.ReportContainer>
        <S.Title>최종 견적을 확인하세요</S.Title>
        <S.ContentContainer>
          <S.Header />
          <S.Vector />
          <S.Content>
            <S.Context>
              {loading && "불러오는 중…"}
              {!loading && error && <span style={{ color: "black" }}>{error}</span>}
              {!loading && !error && (
                <S.pre>{text}</S.pre>
              )}
            </S.Context>
          </S.Content>
        </S.ContentContainer>
      </S.ReportContainer>
    </S.Container>
  );
}
