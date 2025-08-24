// src/sections/SecondScoreSection/index.jsx
import React, { useEffect, useState } from "react";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

// 🔎 콘솔 로깅 토글
const DEBUG = true;

/* ===== helpers ===== */
function getParam(name) {
  try { return new URLSearchParams(window.location.search).get(name); }
  catch { return null; }
}
function getSessionId() {
  const fromUrl = getParam("session_id");
  if (fromUrl) { localStorage.setItem(SESSION_KEY, fromUrl); return fromUrl; }
  return localStorage.getItem(SESSION_KEY);
}
function toKRnum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toLocaleString("ko-KR") : String(v ?? "-");
}
const coalesce = (...args) => args.find(v => v !== undefined && v !== null);

// 예산 포맷: 최대한 자연스럽게 "만원" 기준으로
function formatBudget(budget) {
  if (budget == null || budget === "") return "-";
  const s = String(budget).trim();

  // 범위/수식 표현은 원문 유지 (예: "25~35만원", "60만원 이상")
  if (/[~\-–]|이상|이하|초과|미만/.test(s)) return s;

  const n = Number(s.replace(/[^\d.-]/g, ""));
  const hasMan = /만\s*원?/.test(s);
  const hasWon = /원/.test(s);
  if (!Number.isFinite(n)) return s;

  if (hasMan) return `${toKRnum(n)}만원`;
  if (hasWon && n >= 10000) return `${toKRnum(Math.round(n / 10000))}만원`;
  if (!hasWon && n <= 500) return `${toKRnum(n)}만원`;
  return `${toKRnum(n)}원`;
}

// 납기 포맷: 숫자만이면 "일 이내" 붙임, 단위 있으면 원문 유지
function formatDue(due) {
  if (due == null || due === "") return "-";
  const s = String(due).trim();
  if (!/[일주월영업]/.test(s) && /^\d+(\.\d+)?$/.test(s)) return `${s}일 이내`;
  return s;
}

/* ===== finishing 탐색 유틸 ===== */

// 값 정규화: 배열/객체 → 읽기 쉬운 문자열
function normalizeFinishingValue(val) {
  if (val == null) return null;
  if (Array.isArray(val)) {
    const parts = val.map(normalizeFinishingValue).filter(Boolean);
    return parts.length ? parts.join(", ") : null;
  }
  if (typeof val === "object") {
    const pick = ["name","label","title","value","type","desc","description","text","option"];
    for (const k of pick) if (val[k]) return String(val[k]);
    // { corner_rounding: true, radius: "3mm" } 같은 형태
    const truthy = Object.entries(val).filter(([,v]) => !!v).map(([k]) => k);
    if (truthy.length) return truthy.join(", ");
    return null;
  }
  const s = String(val).trim();
  return s || null;
}

// 객체 전체를 깊게 훑어 후가공 관련 키/값 찾기 + 경로 반환
function deepFindFinishingWithPath(obj) {
  const keyRe =
    /(finish|finishing|finishes|post[_\s-]?process(ing)?|after[_\s-]?process(ing)?|coating|laminat|uv|foil|emboss|deboss|die[_\s-]?cut|round|corner|귀도리|박|형압|코팅|후가공)/i;
  const seen = new WeakSet();
  const q = [{ node: obj, path: [] }];

  while (q.length) {
    const { node, path } = q.shift();
    if (!node || typeof node !== "object") continue;
    if (seen.has(node)) continue;
    seen.add(node);

    for (const [k, v] of Object.entries(node)) {
      const nextPath = path.concat(k);
      if (keyRe.test(k)) {
        const norm = normalizeFinishingValue(v);
        if (norm) return { value: norm, path: nextPath.join(".") };
      }
      if (v && typeof v === "object") q.push({ node: v, path: nextPath });
    }
  }
  return { value: null, path: null };
}

/** API 응답 → 최종견적 오브젝트 (키 통합 + 딥스캔 + 로깅) */
function extractFinalQuote(json = {}) {
  const source =
    json.final_quote_data ||
    json.quote_info ||
    json.final_quote ||
    json.data?.final_quote_data ||
    json.data?.quote_info ||
    {};

  const slots = json.slots || source.slots || {};

  const creation_date =
    source.creation_date || source.created_date || json.creation_date || json.created_date;

  // 1) 얕은 후보 키들
  const finishingCandidates = {
    "source.finishing":        source.finishing,
    "slots.finishing":         slots.finishing,
    "source.coating":          source.coating,
    "slots.coating":           slots.coating,
    "source.post_processing":  source.post_processing,
    "slots.post_processing":   slots.post_processing,
    "source.postprocess":      source.postprocess,
    "slots.postprocess":       slots.postprocess,
    "json.finishing":          json.finishing,
    "json.coating":            json.coating,
  };
  let finishing =
    finishingCandidates["source.finishing"] ??
    finishingCandidates["slots.finishing"] ??
    finishingCandidates["source.coating"] ??
    finishingCandidates["slots.coating"] ??
    finishingCandidates["source.post_processing"] ??
    finishingCandidates["slots.post_processing"] ??
    finishingCandidates["source.postprocess"] ??
    finishingCandidates["slots.postprocess"] ??
    finishingCandidates["json.finishing"] ??
    finishingCandidates["json.coating"] ??
    null;

  // 2) 못 찾으면 전체 깊게 스캔
  let deepPath = null;
  if (finishing == null) {
    const { value, path } = deepFindFinishingWithPath({ source, slots, root: json });
    finishing = value;
    deepPath = path;
  }

  if (DEBUG) {
    console.groupCollapsed("[SecondScore] Finishing trace");
    console.log("slots keys:", Object.keys(slots || {}));
    console.log("shallow candidates:", finishingCandidates);
    console.log("picked (shallow):",
      Object.entries(finishingCandidates).find(([,v]) => v != null)?.[0] ?? "(none)");
    console.log("deep result:", { value: finishing ?? "(none)", path: deepPath });
    console.groupEnd();
  }

  const fq = {
    quote_number: source.quote_number ?? "-",
    creation_date: creation_date ?? "-",
    category: source.category ?? "-",
    quantity: coalesce(source.quantity, slots.quantity, "-"),
    size:     coalesce(source.size,     slots.size, "-"),
    paper:    coalesce(source.paper,    slots.paper, "-"),
    finishing: finishing ?? "-",                    // ← 최종 확정
    due_days:  coalesce(source.due_days, slots.due_days, "-"),
    budget:    coalesce(source.budget,   slots.budget, "-"),
    region:    coalesce(source.region,   slots.region, "-"),
    available_printshops:
      coalesce(source.available_printshops, source.total_available,
               json.available_printshops, json.total_available),
    price_range: coalesce(source.price_range, json.price_range),
  };

  if (DEBUG) console.log("[SecondScore] normalized final quote:", fq);
  return fq;
}

/** 화면용 텍스트 생성 */
function buildQuoteTextOnly(fq) {
  if (!fq) return "최종 견적서를 찾을 수 없습니다.";

  const qtyStr = (() => {
    const q = fq.quantity;
    if (q === null || q === undefined || q === "") return "-";
    const s = String(q);
    return /(부|매|장)$/.test(s) ? s : `${s}부`;
  })();

  const lines = [
    `견적번호  : ${fq.quote_number || "-"}`,
    `생성일    : ${fq.creation_date || "-"}`,
    "",
    `───────────────── [주문 정보] ────────────────`,
    `• 카테고리 : ${fq.category || "-"}`,
    `• 수량 :   ${qtyStr}`,
    `• 사이즈 :  ${fq.size || "-"}`,
    `• 용지 :   ${fq.paper || "-"}`,
    `• 후가공 :  ${fq.finishing || "-"}`,
    `• 납기 :   ${formatDue(fq.due_days)}`,
    `• 예산 :   ${formatBudget(fq.budget)}`,
    `• 지역 :   ${fq.region || "-"}`,
    "",
    `────────────────── [요약] ──────────────────`,
  ];

  if (fq.available_printshops != null)
    lines.push(`• 견적 가능 인쇄소 : ${fq.available_printshops}곳`);
  if (fq.price_range) lines.push(`• 가격대 : ${fq.price_range}`);

  const text = lines.join("\n");
  if (DEBUG) console.log("[SecondScore] render text:\n" + text);
  return text;
}

/* ===== Component ===== */
export default function SecondScoreSection() {
  const [text, setText] = useState("불러오는 중…");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const sid = getSessionId();
        if (!sid) {
          setError("완성된 견적서가 없습니다. 챗봇을 통해 견적서를 완성해주세요.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/chat/quote/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ session_id: sid }),
          credentials: "include",
        });

        const json = await res.json().catch(() => ({}));
        if (DEBUG) console.log("[SecondScore] /chat/quote response:", json);
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`);

        const fq = extractFinalQuote(json);
        const msg = buildQuoteTextOnly(fq);
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
              {loading && "최종 견적서 산출까지 시간이 조금 걸릴 수 있습니다."}
              {!loading && error && <span style={{ color: "black" }}>{error}</span>}
              {!loading && !error && <S.pre>{text}</S.pre>}
            </S.Context>
          </S.Content>
        </S.ContentContainer>
      </S.ReportContainer>
    </S.Container>
  );
}
