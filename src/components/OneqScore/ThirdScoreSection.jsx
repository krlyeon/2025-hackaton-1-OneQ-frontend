// src/sections/ThirdScoreSection/index.jsx
// 추천 인쇄소 Top3 카드: 이메일/전화/주소 + 점수(가격/납기/작업) + 총합(가중합)
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const BG_URL = new URL("../../assets/Score/body3.svg", import.meta.url).href;
import S from "./ThirdScoreSection.styles.js";

const API_BASE = (import.meta.env?.VITE_API_BASE ?? "/api").replace(/\/$/, "");
const SESSION_KEY = "oneq_server_session_id";

// 가중치 최대치: 가격 40, 납기 30, 작업 30
const MAXS = { price: 40, due: 30, work: 30 };

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

// "가격 35 / 납기 28 / 작업 22" → {price:35, due:28, work:22}
function parseReason(reason = "") {
  const pick = (re) => {
    const m = re.exec(reason);
    return m ? Number(m[1]) : null;
  };
  return {
    price: pick(/가격\s*([0-9]+(?:\.[0-9]+)?)/),
    due:   pick(/납기\s*([0-9]+(?:\.[0-9]+)?)/),
    work:  pick(/작업\s*([0-9]+(?:\.[0-9]+)?)/),
  };
}

// 0~100 원점수 → 가중 환산(40/30/30)
function toWeightedPoints(scores = {}) {
  const price = Number(scores.price);
  const due   = Number(scores.due);
  const work  = Number(scores.work);
  return {
    price: Number.isFinite(price) ? Math.round((price * MAXS.price) / 100) : null,
    due:   Number.isFinite(due)   ? Math.round((due   * MAXS.due)   / 100) : null,
    work:  Number.isFinite(work)  ? Math.round((work  * MAXS.work)  / 100) : null,
  };
}

// 백엔드 shop 객체 → 화면에 필요한 필드로 정규화
function normalizeShop(shop) {
  // 연락처/주소
  const email   = shop.printshop_email   || shop.email   || "-";
  const phone   = shop.printshop_phone   || shop.phone   || "-";
  const address = shop.printshop_address || shop.address || "-";

  // 점수: 1순위 recommendation_reason(이미 환산), 2순위 scores(0~100 → 환산)
  const parsed = parseReason(shop.recommendation_reason || "");
  const parsedOK = [parsed.price, parsed.due, parsed.work].every(v => Number.isFinite(v));
  const weighted = parsedOK ? parsed : toWeightedPoints(shop.scores || {});
  const hasAllWeighted = [weighted.price, weighted.due, weighted.work].every(v => Number.isFinite(v));

  const total = hasAllWeighted
    ? weighted.price + weighted.due + weighted.work // 최대 100
    : (Number.isFinite(shop.recommendation_score) ? Math.round(shop.recommendation_score) : null);

  return {
    name: shop.printshop_name || shop.shop_name || "-",
    email, phone, address,
    points: weighted,         // {price,due,work} = 가중 환산 점수
    total,                    // 총합(가중합)
    verified: !!shop.is_verified,
    rankKey: Number.isFinite(shop?.scores?.oneq_total)
      ? Number(shop.scores.oneq_total)
      : (Number.isFinite(total) ? total : -1), // 정렬용
  };
}

export default function ThirdScoreSection() {
  const navigate = useNavigate();
  const [shopsRaw, setShopsRaw] = useState([]);

  // 1) 우선 로컬 저장된 추천 인쇄소 사용
  useEffect(() => {
    const local = (() => {
      try { return JSON.parse(localStorage.getItem("oneq_recommendations") || "[]"); }
      catch { return []; }
    })();
    if (Array.isArray(local) && local.length) {
      setShopsRaw(local.slice(0, 3));
      return;
    }

    // 2) 없으면 /chat/quote/ 를 다시 호출해서 final_quote.recommendations 사용
    (async () => {
      try {
        const sid = getSessionId();
        if (!sid) return;

        const r = await fetch(`${API_BASE}/chat/quote/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ session_id: sid }),
          credentials: "include",
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j?.detail || `HTTP ${r.status}`);

        const recs = Array.isArray(j?.final_quote?.recommendations)
          ? j.final_quote.recommendations
          : [];
        setShopsRaw(recs.slice(0, 3));
      } catch {
        // 조용히 실패
      }
    })();
  }, []);

  

  // 정규화 + 정렬(원큐스코어/총점 내림차순) + Top3
  const cards = useMemo(() => {
    return shopsRaw
      .map(normalizeShop)
      .sort((a, b) => (b.rankKey - a.rankKey))
      .slice(0, 3);
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
            {cards.length === 0 ? (
              <S.Content>
                <S.PlaceInfo>추천 인쇄소 데이터를 찾지 못했습니다.</S.PlaceInfo>
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
                        {Number.isFinite(shop.total) ? shop.total : "-"}
                        <S.Text>점</S.Text>
                      </S.TotalScore>
                    </S.PlaceInfo>

                    <S.Score>
                      {/* 작업 적합도 (분모 30) */}
                      <S.Score1>
                        <S.RealScore>
                          {Number.isFinite(shop.points.work) ? shop.points.work : "-"}
                        </S.RealScore>
                        <S.BaseScore>/ {MAXS.work}</S.BaseScore>
                      </S.Score1>
                      {/* 납기 충족도 (분모 30) */}
                      <S.Score2>
                        <S.RealScore>
                          {Number.isFinite(shop.points.due) ? shop.points.due : "-"}
                        </S.RealScore>
                        <S.BaseScore>/ {MAXS.due}</S.BaseScore>
                      </S.Score2>
                      {/* 가격 적합도 (분모 40) */}
                      <S.Score3>
                        <S.RealScore>
                          {Number.isFinite(shop.points.price) ? shop.points.price : "-"}
                        </S.RealScore>
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
