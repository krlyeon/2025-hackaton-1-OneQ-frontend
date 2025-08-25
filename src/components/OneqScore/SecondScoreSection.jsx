// src/sections/SecondScoreSection/index.jsx
import React, { useEffect, useState } from "react";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

/* ===== Debug toggle & logger (URL에 ?debug=1 or ?dbg=1) ===== */
const DEBUG = (() => {
  try {
    const p = new URLSearchParams(location.search);
    if (p.get("debug") === "1" || p.get("dbg") === "1") return true;
  } catch {}
  return false;
})();
const dlog = (...args) => { if (DEBUG) console.debug("[SecondScore]", ...args); };

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

// 예산 포맷: 자연스럽게 "만원" 기준, 범위/조건 표현은 원문 유지
function formatBudget(budget) {
  if (budget == null || budget === "") return "-";
  const s = String(budget).trim();
  if (/[~\-–]|이상|이하|초과|미만/.test(s)) return s; // "22,000~42,000원", "60만원 이상" 등
  const n = Number(s.replace(/[^\d.-]/g, ""));
  const hasMan = /만\s*원?/.test(s);
  const hasWon = /원/.test(s);
  if (!Number.isFinite(n)) return s;
  if (hasMan) return `${toKRnum(n)}만원`;
  if (hasWon && n >= 10000) return `${toKRnum(Math.round(n / 10000))}만원`;
  if (!hasWon && n <= 500) return `${toKRnum(n)}만원`;
  return `${toKRnum(n)}원`;
}

// 납기 포맷: 숫자만이면 "일 이내", 단위가 있으면 원문 유지
function formatDue(due) {
  if (due == null || due === "") return "-";
  const s = String(due).trim();
  if (!/[일주월영업]/.test(s) && /^\d+(\.\d+)?$/.test(s)) return `${s}일 이내`;
  return s;
}

/* ===== finishing 탐색 (값이 어디에 있든 잡아오기) ===== */
function normalizeFinishingValue(val) {
  if (val == null) return null;
  if (Array.isArray(val)) {
    const parts = val.map(normalizeFinishingValue).filter(Boolean);
    return parts.length ? parts.join(", ") : null;
  }
  if (typeof val === "object") {
    const pick = ["name","label","title","value","type","desc","description","text","option"];
    for (const k of pick) if (val[k]) return String(val[k]);
    const truthy = Object.entries(val).filter(([,v]) => !!v).map(([k]) => k);
    if (truthy.length) return truthy.join(", ");
    return null;
  }
  const s = String(val).trim();
  return s || null;
}

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

/* ===== API 응답 → 최종견적 정규화 (명세서 호환) ===== */
function extractFinalQuote(json = {}) {
  // 최종 견적 본문: 여러 키 스키마 지원
  const source =
    json.final_quote_data ||
    json.quote_info ||
    json.final_quote ||
    json.data?.final_quote_data ||
    json.data?.quote_info ||
    {};

  // 명세서: 최종 견적일 때 collected_slots 포함
  const collected = json.collected_slots || source.collected_slots || {};
  const slots     = json.slots || source.slots || {};

  const creation_date =
    source.creation_date || source.created_date || json.creation_date || json.created_date;

  // finishing 우선순위: source → slots → collected → (coating/post_processing 등 대체 키) → 딥스캔
  const finishingCandidates = {
    "source.finishing":        source.finishing,
    "slots.finishing":         slots.finishing,
    "collected.finishing":     collected.finishing,
    "source.coating":          source.coating,
    "slots.coating":           slots.coating,
    "collected.coating":       collected.coating,
    "source.post_processing":  source.post_processing,
    "slots.post_processing":   slots.post_processing,
    "collected.post_processing": collected.post_processing,
    "source.postprocess":      source.postprocess,
    "slots.postprocess":       slots.postprocess,
    "collected.postprocess":   collected.postprocess,
  };

  let finishing =
    finishingCandidates["source.finishing"] ??
    finishingCandidates["slots.finishing"] ??
    finishingCandidates["collected.finishing"] ??
    finishingCandidates["source.coating"] ??
    finishingCandidates["slots.coating"] ??
    finishingCandidates["collected.coating"] ??
    finishingCandidates["source.post_processing"] ??
    finishingCandidates["slots.post_processing"] ??
    finishingCandidates["collected.post_processing"] ??
    finishingCandidates["source.postprocess"] ??
    finishingCandidates["slots.postprocess"] ??
    finishingCandidates["collected.postprocess"] ??
    null;

  if (finishing == null) {
    const { value, path } = deepFindFinishingWithPath({ source, slots, collected, root: json });
    finishing = value;
    if (DEBUG && (value || path)) console.debug("[SecondScore] finishing deep path:", path, "→", value);
  }

  const fq = {
    quote_number: source.quote_number ?? "-",
    creation_date: creation_date ?? "-",
    category: source.category ?? "-",

    // 모든 슬롯: source → slots → collected 우선순위
    quantity: (source.quantity ?? slots.quantity ?? collected.quantity ?? "-"),
    size:     (source.size     ?? slots.size     ?? collected.size     ?? "-"),
    paper:    (source.paper    ?? slots.paper    ?? collected.paper    ?? "-"),
    printing: (source.printing ?? slots.printing ?? collected.printing ?? "-"),
    finishing: (finishing && String(finishing).trim()) || "-",
    due_days:  (source.due_days  ?? slots.due_days  ?? collected.due_days  ?? "-"),
    budget:    (source.budget    ?? slots.budget    ?? collected.budget    ?? "-"),
    region:    (source.region    ?? slots.region    ?? collected.region    ?? "-"),

    available_printshops:
      (source.available_printshops ?? source.total_available ??
       json.available_printshops   ?? json.total_available),

    price_range: (source.price_range ?? json.price_range),
  };

  dlog("final quote preview:", fq);
  return fq;
}

/* ===== 화면용 문자열 생성 ===== */
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
    `• 인쇄 :   ${fq.printing || "-"}`,   // 명세서 대응
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
  dlog("render text:", "\n" + text);
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
