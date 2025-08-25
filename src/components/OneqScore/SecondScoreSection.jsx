// src/sections/SecondScoreSection/index.jsx
import React, { useEffect, useState } from "react";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

/* Debug */
const DEBUG = (() => {
  try { const p = new URLSearchParams(location.search); return p.get("debug")==="1"||p.get("dbg")==="1"; } catch {}
  return false;
})();
const dlog = (...a) => DEBUG && console.debug("[SecondScore]", ...a);

/* ✅ 카테고리 별칭 → 표준 한글 카테고리 */
const CATEGORY_ALIASES = {
  // 명함
  "card":"명함","businesscard":"명함","business_card":"명함","명함":"명함",
  // 포스터
  "poster":"포스터","포스터":"포스터",
  // 브로슈어
  "brochure":"브로슈어","leaflet":"브로슈어","브로슈어":"브로슈어",
  // 배너
  "banner":"배너","배너":"배너",
  // 현수막
  "banner2":"현수막","현수막":"현수막","현수막배너":"현수막",
  // 스티커
  "sticker":"스티커","label":"스티커","라벨":"스티커","스티커":"스티커",
};
const normalizeCategory = (cat) => {
  const key = String(cat ?? "").replace(/[()\s]/g, "").toLowerCase();
  return CATEGORY_ALIASES[key] || (cat || "-");
};

/* ✅ 카테고리별 슬롯 순서 */
const SLOT_ORDERS = {
  "명함":   ["category","paper","size","printing","finishing","quantity","due_days","region","budget"],
  "포스터": ["category","paper","size","coating","quantity","due_days","region","budget"],
  "브로슈어":["category","paper","size","folding","quantity","due_days","region","budget"],
  "배너":   ["category","size","stand","quantity","due_days","region","budget"],
  "현수막": ["category","size","processing","quantity","due_days","region","budget"],
  "스티커": ["category","size","type","quantity","due_days","region","budget"],
};
const DEFAULT_ORDER = ["category","paper","size","printing","finishing","quantity","due_days","region","budget"];

/* 라벨 */
const LABELS = {
  category:"카테고리", paper:"용지", size:"사이즈", printing:"인쇄", finishing:"후가공",
  coating:"코팅", folding:"접지", stand:"거치대", processing:"가공", type:"종류",
  quantity:"수량", due_days:"납기", region:"지역", budget:"예산",
};

/* helpers */
function getParam(name){ try {return new URLSearchParams(window.location.search).get(name);} catch {return null;} }
function getSessionId(){ const u=getParam("session_id"); if(u){ localStorage.setItem(SESSION_KEY,u); return u; } return localStorage.getItem(SESSION_KEY); }
const coalesce = (...args) => args.find(v => v !== undefined && v !== null);
const toKRnum = (v)=>{ const n=Number(v); return Number.isFinite(n)?n.toLocaleString("ko-KR"):String(v??"-"); };
function formatBudget(b){
  if (b==null||b==="") return "-";
  const s=String(b).trim(); if (/[~\-–]|이상|이하|초과|미만/.test(s)) return s;
  const n=Number(s.replace(/[^\d.-]/g,"")); const hasMan=/만\s*원?/.test(s), hasWon=/원/.test(s);
  if(!Number.isFinite(n)) return s;
  if(hasMan) return `${toKRnum(n)}만원`;
  if(hasWon && n>=10000) return `${toKRnum(Math.round(n/10000))}만원`;
  if(!hasWon && n<=500) return `${toKRnum(n)}만원`;
  return `${toKRnum(n)}원`;
}
function formatDue(d){
  if (d==null||d==="") return "-";
  const s=String(d).trim(); return (!/[일주월영업]/.test(s) && /^\d+(\.\d+)?$/.test(s)) ? `${s}일 이내` : s;
}

/* finishing 탐색 */
function normalizeFinishingValue(val){
  if(val==null) return null;
  if(Array.isArray(val)){ const parts=val.map(normalizeFinishingValue).filter(Boolean); return parts.length?parts.join(", "):null;}
  if(typeof val==="object"){
    const pick=["name","label","title","value","type","desc","description","text","option"];
    for(const k of pick) if(val[k]) return String(val[k]);
    const truthy=Object.entries(val).filter(([,v])=>!!v).map(([k])=>k);
    return truthy.length?truthy.join(", "):null;
  }
  const s=String(val).trim(); return s||null;
}
function deepFindFinishingWithPath(obj){
  const keyRe=/(finish|finishing|finishes|post[_\s-]?process(ing)?|after[_\s-]?process(ing)?|coating|laminat|uv|foil|emboss|deboss|die[_\s-]?cut|round|corner|귀도리|박|형압|코팅|후가공)/i;
  const seen=new WeakSet(); const q=[{node:obj,path:[]}];
  while(q.length){
    const {node,path}=q.shift(); if(!node||typeof node!=="object") continue; if(seen.has(node)) continue; seen.add(node);
    for(const [k,v] of Object.entries(node)){
      const next=path.concat(k);
      if(keyRe.test(k)){ const norm=normalizeFinishingValue(v); if(norm) return {value:norm,path:next.join(".")}; }
      if(v&&typeof v==="object") q.push({node:v,path:next});
    }
  }
  return {value:null,path:null};
}

/* █ API 응답 → 최종견적 정규화 */
function extractFinalQuote(json={}){
  const source = json.final_quote_data || json.quote_info || json.final_quote || json.data?.final_quote_data || json.data?.quote_info || {};
  const collected = json.collected_slots || source.collected_slots || {};
  const slots = json.slots || source.slots || {};

  const rawCategory = coalesce(source.category, collected.category, slots.category, "-");
  const category = normalizeCategory(rawCategory);   // ★ 정규화된 카테고리

  // finishing 후보 + 딥스캔
  const finishingCandidates = {
    "source.finishing":        source.finishing,
    "slots.finishing":         slots.finishing,
    "collected.finishing":     collected.finishing,
    "source.coating":          source.coating,    "slots.coating": slots.coating,    "collected.coating": collected.coating,
    "source.post_processing":  source.post_processing, "slots.post_processing": slots.post_processing, "collected.post_processing": collected.post_processing,
    "source.postprocess":      source.postprocess, "slots.postprocess": slots.postprocess, "collected.postprocess": collected.postprocess,
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
  if (finishing==null) finishing = deepFindFinishingWithPath({source,slots,collected,root:json}).value;

  return {
    quote_number: source.quote_number ?? "-",
    creation_date: source.creation_date || source.created_date || json.creation_date || json.created_date || "-",
    category,                     // ★ 정규화된 값으로 교체

    // 공통/명함
    paper:    coalesce(source.paper,    slots.paper,    collected.paper,    "-"),
    size:     coalesce(source.size,     slots.size,     collected.size,     "-"),

    // printing 동의어도 탐색 (혹시 서버가 다른 키를 줄 때 대비)
    printing: coalesce(
      source.printing, slots.printing, collected.printing,
      source.print_method, slots.print_method, collected.print_method,
      source.printType, slots.printType, collected.printType,
      "-"
    ),
    finishing: (finishing && String(finishing).trim()) || "-",

    // 포스터
    coating:  coalesce(source.coating,  slots.coating,  collected.coating,  "-"),
    // 브로슈어
    folding:  coalesce(source.folding,  slots.folding,  collected.folding,  "-"),
    // 배너
    stand:    coalesce(source.stand,    slots.stand,    collected.stand,    "-"),
    // 현수막
    processing: coalesce(source.processing, slots.processing, collected.processing, "-"),
    // 스티커
    type:     coalesce(source.type,     slots.type,     collected.type,     "-"),

    quantity: coalesce(source.quantity, slots.quantity, collected.quantity, "-"),
    due_days: coalesce(source.due_days, slots.due_days, collected.due_days, "-"),
    region:   coalesce(source.region,   slots.region,   collected.region,   "-"),
    budget:   coalesce(source.budget,   slots.budget,   collected.budget,   "-"),

    available_printshops: coalesce(source.available_printshops, source.total_available, json.available_printshops, json.total_available),
    price_range: coalesce(source.price_range, json.price_range),
  };
}

/* 포맷터 */
function formatByKey(key, value, category){
  if (value==null || value==="") return "-";
  switch (key) {
    case "budget":   return formatBudget(value);
    case "due_days": return formatDue(value);
    case "quantity": {
      const s = String(value);
      if (/[부|매|장|개]$/.test(s)) return s;
      const unit = (category==="배너"||category==="현수막") ? "개" : (category==="스티커" ? "장" : "부");
      return `${s}${unit}`;
    }
    default: return String(value);
  }
}

/* █ 화면 문자열 — 카테고리별 슬롯만 출력 */
function buildQuoteTextOnly(fq){
  if(!fq) return "최종 견적서를 찾을 수 없습니다.";
  const order = SLOT_ORDERS[fq.category] || DEFAULT_ORDER;

  const lines = [
    `견적번호  : ${fq.quote_number || "-"}`,
    `생성일    : ${fq.creation_date || "-"}`,
    "",
    `[주문 정보]`,
  ];
  for (const key of order) {
    const label = LABELS[key] || key;
    lines.push(`• ${label} : ${formatByKey(key, fq[key], fq.category)}`);
  }
  lines.push("", `[요약]`);
  if (fq.available_printshops != null) lines.push(`• 견적 가능 인쇄소 : ${fq.available_printshops}곳`);
  if (fq.price_range) lines.push(`• 가격대 : ${fq.price_range}`);

  const txt = lines.join("\n");
  dlog("render text:\n"+txt);
  return txt;
}

/* Component */
export default function SecondScoreSection(){
  const [text,setText] = useState("불러오는 중…");
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{(async()=>{
    try{
      const sid = getSessionId();
      if(!sid){ setError("완성된 견적서가 없습니다. 챗봇을 통해 견적서를 완성해주세요."); setLoading(false); return; }

      const res = await fetch(`${API_BASE}/chat/quote/`,{
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify({ session_id: sid }),
        credentials:"include",
      });
      const json = await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`);

      const fq = extractFinalQuote(json);
      setText(buildQuoteTextOnly(fq));
    }catch(e){ setError(e.message || "요청 실패"); }
    finally{ setLoading(false); }
  })()},[]);

  return (
    <S.Container $bg={BG_URL}>
      <S.ReportContainer>
        <S.Title>최종 견적을 확인하세요</S.Title>
        <S.ContentContainer>
          <S.Header />
          <S.Vector />
          <S.Content>
            <S.Context>
              {loading && "최종 견적서가 5분 이내에 산출됩니다. 잠시만 기다려주세요!"}
              {!loading && error && <span style={{ color: "black" }}>{error}</span>}
              {!loading && !error && <S.pre>{text}</S.pre>}
            </S.Context>
          </S.Content>
        </S.ContentContainer>
      </S.ReportContainer>
    </S.Container>
  );
}
