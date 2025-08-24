// src/sections/ThirdScoreSection/index.jsx
// 최종 견적서(/chat/quote/) 기반 추천 인쇄소 Top3
// 세부 점수: 가격(30) / 납기(30) / 작업(40) + 총점(oneq 또는 가중합)

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const BG_URL = new URL("../../assets/Score/body3.svg", import.meta.url).href;
import S from "./ThirdScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

// 🔧 필요 시 true로 켜세요 (콘솔 로그)
const DEBUG = false;

// ✅ 분모: 가격 30 / 납기 30 / 작업 40
const MAXS = { price: 30, due: 30, work: 40 };

/* ============ helpers ============ */
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const toNum = (v) => {
  if (v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^\d.+-]/g, "")); // "90점" → 90
  return Number.isFinite(n) ? n : null;
};
const isNum = (v) => Number.isFinite(v);

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

// 0~100 또는 0~1 → 분모(max)로 환산
function toWeighted(raw, max) {
  const n = toNum(raw);
  if (!isNum(n)) return null;
  const base = n <= 1 ? n * 100 : n;
  return Math.round((clamp(base, 0, 100) * max) / 100);
}

// "가격 35 / 납기 28 / 작업 22" 등 텍스트에서 숫자 추출
function parseReason(reason = "") {
  const txt = String(reason || "");
  const grab = (labels, max) => {
    const re = new RegExp(`(?:${labels.join("|")})\\s*[：: ]?\\s*([0-9]+(?:\\.[0-9]+)?)`, "i");
    const m = re.exec(txt);
    if (!m) return null;
    const raw = parseFloat(m[1]);
    if (!Number.isFinite(raw)) return null;
    return raw > max ? Math.round((raw * max) / 100) : Math.round(raw);
  };
  return {
    price: grab(["가격","비용","단가","price"], MAXS.price),
    due:   grab(["납기","기간","속도","delivery","deadline","time"], MAXS.due),
    work:  grab(["작업","적합도","품질","퀄리티","work","fit","quality"], MAXS.work),
  };
}

// 다양한 컨테이너에서 점수 키 찾기 (루트, scores, score_details, etc.)
function pickScoreRaw(shop, variants) {
  const pools = [
    { src: "root",           obj: shop },
    { src: "scores",         obj: shop?.scores },
    { src: "score",          obj: shop?.score },
    { src: "metrics",        obj: shop?.metrics },
    { src: "score_details",  obj: shop?.score_details },        // ⬅️ 네 샘플에 deadline_score가 여기
    { src: "details",        obj: shop?.details },
    { src: "shop",           obj: shop?.shop },
    { src: "shop.scores",    obj: shop?.shop?.scores },
    { src: "shop.details",   obj: shop?.shop?.details },
  ];
  for (const { src, obj } of pools) {
    if (!obj) continue;
    for (const key of variants) {
      if (key in obj) {
        const v = obj[key];
        if (v !== undefined && v !== null) {
          if (DEBUG) console.log("[pickScoreRaw] hit", { src, key, value: v });
          return v;
        }
      }
    }
  }
  return null;
}

// 최종 견적 응답에서 추천 인쇄소 리스트 추출 (스키마 호환)
function extractRecommendedShops(json = {}) {
  if (Array.isArray(json.recommended_shops)) return json.recommended_shops;
  if (Array.isArray(json.final_quote_data?.recommended_shops)) return json.final_quote_data.recommended_shops;
  if (Array.isArray(json.quote_info?.recommended_shops)) return json.quote_info.recommended_shops;
  if (Array.isArray(json.final_quote?.recommendations)) return json.final_quote.recommendations;
  if (Array.isArray(json.recommendations)) return json.recommendations;
  return [];
}

/** shop 객체 → 화면용 표준 구조 */
function normalizeShop(shop = {}) {
  if (DEBUG) console.log("[normalizeShop] input:", shop);

  const name =
    shop.name ?? shop.title ?? shop.shop_name ?? shop.printshop_name ?? "-";
  const email =
    shop.email ?? shop.mail ?? shop.printshop_email ?? "-";
  const phone =
    shop.phone ?? shop.tel ?? shop.contact ?? shop.phone_number ?? shop.printshop_phone ?? "-";
  const address =
    shop.address ?? shop.addr ?? shop.location ?? shop.printshop_address ?? "-";

  // 1) 점수 원본 찾기 (루트/중첩/score_details 모두 포함)
  const rawPrice = pickScoreRaw(shop, [
    "price_score","priceScore","price_points","price_point","price"
  ]);
  const rawDue   = pickScoreRaw(shop, [
    "deadline_score","deadlineScore","time_score","speed_score","deadline","due","delivery"
  ]);
  const rawWork  = pickScoreRaw(shop, [
    "workfit_score","workfitScore","quality_score","suitability_score","workfit","work","fit","quality"
  ]);

  if (DEBUG) console.log("[normalizeShop] raw scores:", { name, rawPrice, rawDue, rawWork });

  // 2) 환산
  let price = toWeighted(rawPrice, MAXS.price);
  let due   = toWeighted(rawDue,   MAXS.due);
  let work  = toWeighted(rawWork,  MAXS.work);

  // 3) reason에서 보정(문자 안에 숫자가 있을 때)
  if (![price, due, work].every(isNum)) {
    const parsed = parseReason(shop.recommendation_reason || shop.reason || shop.desc || "");
    price = isNum(price) ? price : parsed.price;
    due   = isNum(due)   ? due   : parsed.due;
    work  = isNum(work)  ? work  : parsed.work;
  }

  // 4) 그래도 비면 oneq_score를 30/30/40으로 분해해 채우기
  const oneq = toNum(shop.oneq_score ?? shop.oneqScore ?? shop.total_score);
  if (isNum(oneq) && (![price, due, work].every(isNum))) {
    const base = clamp(oneq, 0, 100);
    if (!isNum(price)) price = Math.round((base * MAXS.price) / 100);
    if (!isNum(due))   due   = Math.round((base * MAXS.due)   / 100);
    if (!isNum(work))  work  = Math.round((base * MAXS.work)  / 100);
  }

  if (DEBUG) console.log("[normalizeShop] weighted:", { name, price, due, work });

  // 총점: oneq 우선 → 가중합 → recommendation_score
  let total = null;
  if (isNum(oneq)) {
    total = clamp(Math.round(oneq), 0, 100);
  } else if ([price, due, work].every(isNum)) {
    total = clamp(price + due + work, 0, 100); // 30+30+40=100
  } else {
    const rec = toNum(shop.recommendation_score);
    if (isNum(rec)) total = clamp(Math.round(rec), 0, 100);
  }

  // 정렬키: oneq_total > oneq_score > total
  const rk = pickScoreRaw(shop, ["oneq_total","oneqTotal"]);
  const rankKey = isNum(toNum(rk))
    ? toNum(rk)
    : (isNum(oneq) ? oneq : (isNum(total) ? total : -1));

  return {
    name,
    email: email || "-",
    phone: phone || "-",
    address: address || "-",
    points: {
      price: isNum(price) ? price : null,
      due:   isNum(due)   ? due   : null,
      work:  isNum(work)  ? work  : null,
    },
    total: isNum(total) ? total : null,
    rankKey: isNum(rankKey) ? rankKey : -1,
  };
}

/* ============ component ============ */
export default function ThirdScoreSection() {
  const navigate = useNavigate();
  const [shopsRaw, setShopsRaw] = useState(null); // null: 로딩, []: 없음

  useEffect(() => {
    (async () => {
      try {
        const sid = getSessionId();
        if (!sid) { setShopsRaw([]); return; }

        const r = await fetch(`${API_BASE}/chat/quote/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ session_id: sid }),
          credentials: "include",
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j?.detail || `HTTP ${r.status}`);

        const recs = extractRecommendedShops(j);

        if (DEBUG) {
          console.log("[ThirdScoreSection] quote API raw:", j);
          console.log("[ThirdScoreSection] extracted shops:", recs);
          console.log("[ThirdScoreSection] first shop sample:", recs?.[0]);
        }

        setShopsRaw(Array.isArray(recs) ? recs.slice(0, 3) : []);
      } catch (e) {
        if (DEBUG) console.error("[ThirdScoreSection] quote fetch error:", e);
        setShopsRaw([]); // 조용히 실패
      }
    })();
  }, []);

  // 정규화 + 정렬(oneq/총점 내림차순) + Top3
  const cards = useMemo(() => {
    if (!Array.isArray(shopsRaw)) return [];
    const list = shopsRaw.map(normalizeShop);
    list.sort((a, b) => {
      const ta = isNum(a.rankKey) ? a.rankKey : -1;
      const tb = isNum(b.rankKey) ? b.rankKey : -1;
      if (tb !== ta) return tb - ta;
      // 타이브레이커: work(40) > due(30) > price(30)
      const wa = isNum(a.points.work) ? a.points.work : -1;
      const wb = isNum(b.points.work) ? b.points.work : -1;
      if (wb !== wa) return wb - wa;
      const da = isNum(a.points.due) ? a.points.due : -1;
      const db = isNum(b.points.due) ? b.points.due : -1;
      if (db !== da) return db - da;
      const pa = isNum(a.points.price) ? a.points.price : -1;
      const pb = isNum(b.points.price) ? b.points.price : -1;
      return pb - pa;
    });
    return list.slice(0, 3);
  }, [shopsRaw]);

  return (
    <S.Container $bg={BG_URL}>
      <S.Container2>
        <S.ReportContainer>
          <S.Header>
            <S.Title>견적에 맞는 최적의 인쇄소 3곳입니다</S.Title>
            <S.SubTitle>
              <S.SubTitle1><S.Box1 />작업 적합도</S.SubTitle1>
              <S.SubTitle2><S.Box2 />납기 충족도</S.SubTitle2>
              <S.SubTitle3><S.Box3 />가격 적합도</S.SubTitle3>
            </S.SubTitle>
          </S.Header>

          <S.PrintShopContainer>
            {cards === null ? (
              <S.Content><S.PlaceInfo>불러오는 중…</S.PlaceInfo></S.Content>
            ) : cards.length === 0 ? (
              <S.Content>
                <S.PlaceInfo>추천 인쇄소를 검색중입니다.</S.PlaceInfo>
              </S.Content>
            ) : (
              cards.map((shop, i) => (
                <S.Content key={i}>
                  <S.PrintInfo>
                    {shop.email}<br />
                    {shop.phone}<br />
                    {shop.address}
                  </S.PrintInfo>

                  <S.Content2>
                    <S.PlaceInfo>
                      {shop.name}
                      <br />
                      <S.TotalScore>
                        {isNum(shop.total) ? shop.total : "-"}
                        <S.Text>점</S.Text>
                      </S.TotalScore>
                    </S.PlaceInfo>

                    <S.Score>
                      {/* 작업 적합도 (분모 40) */}
                      <S.Score1>
                        <S.RealScore>{isNum(shop.points.work) ? shop.points.work : "-"}</S.RealScore>
                        <S.BaseScore>/ {MAXS.work}</S.BaseScore>
                      </S.Score1>
                      {/* 납기 충족도 (분모 30) */}
                      <S.Score2>
                        <S.RealScore>{isNum(shop.points.due) ? shop.points.due : "-"}</S.RealScore>
                        <S.BaseScore>/ {MAXS.due}</S.BaseScore>
                      </S.Score2>
                      {/* 가격 적합도 (분모 30) */}
                      <S.Score3>
                        <S.RealScore>{isNum(shop.points.price) ? shop.points.price : "-"}</S.RealScore>
                        <S.BaseScore>/ {MAXS.price}</S.BaseScore>
                      </S.Score3>
                    </S.Score>
                  </S.Content2>
                </S.Content>
              ))
            )}
          </S.PrintShopContainer>
        </S.ReportContainer>

        <S.HomeButton onClick={() => navigate("/")}>홈 화면으로 돌아가기</S.HomeButton>
      </S.Container2>
    </S.Container>
  );
}
