// src/sections/SecondScoreSection/index.jsx
import React, { useEffect, useState } from "react";
//import Background2 from "../../assets/Score/body2.svg";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js";

const API_BASE = import.meta.env?.VITE_API_BASE ?? ""; // 예: http://localhost:8000

// (옵션) 이전 단계에서 저장해둔 요청값을 불러와 전송 (없으면 {}로 전송)
function getQuotePayload() {
  try {
    // 채팅 단계에서 저장해둔 값이 있으면 사용 (키 이름은 상황에 맞게 바꿔도 됨)
    return JSON.parse(localStorage.getItem("oneq_rank_request") || "{}");
  } catch {
    return {};
  }
}

function formatFinalQuote(fq) {
  if (!fq) return "";
  // formatted_message가 없을 때를 대비한 최소 텍스트 구성
  const slots = fq.slots || {};
  const rec = Array.isArray(fq.recommendations) ? fq.recommendations[0] : null;

  const lines = [
    `${fq.category ?? "인쇄"} 최종 견적 리포트`,
    "==================================================",
    "",
    "주문 정보:",
    `• 수량: ${slots.quantity ?? "-"}`,
    `• 사이즈: ${slots.size ?? "-"}`,
    `• 용지: ${slots.paper ?? "-"}`,
    `• 코팅: ${slots.coating ?? "-"}`,
    `• 납기: ${slots.due_days ?? "-"}`,
    `• 예산: ${slots.budget ?? "-"}`,
    "",
    fq.total_available != null ? `• 총 ${fq.total_available}개 인쇄소 견적 가능` : "",
    fq.price_range ? `• 가격대: ${fq.price_range}` : "",
    "",
    rec
      ? [
          "추천 인쇄소 TOP",
          "------------------------------",
          `1위. ${rec.printshop_name}`,
          `   추천 점수: ${rec.recommendation_score}점`,
          rec.recommendation_reason ? `   추천 이유: ${rec.recommendation_reason}` : "",
          rec.printshop_phone ? `   연락처: ${rec.printshop_phone}` : "",
          rec.total_price != null
            ? `   총액: ${Number(rec.total_price).toLocaleString()}원`
            : "",
          rec.production_time ? `   제작기간: ${rec.production_time}` : "",
          rec.delivery_options ? `   배송: ${rec.delivery_options}` : "",
          rec.is_verified ? `   인증된 인쇄소` : "",
        ].join("\n")
      : "",
  ].filter(Boolean);

  return lines.join("\n");
}

export default function SecondScoreSection() {
  const [text, setText] = useState("불러오는 중…");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/quote`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(getQuotePayload()),
          credentials: "include",
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`);

        const fq = json?.final_quote;
        const msg =
          fq?.formatted_message ||
          formatFinalQuote(fq) ||
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
              {!loading && error && <span style={{ color: "red" }}>{error}</span>}
              {!loading && !error && (
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{text}</pre>
              )}
            </S.Context>
          </S.Content>
        </S.ContentContainer>
      </S.ReportContainer>
    </S.Container>
  );
}
