// src/components/OneqScore/ThirdScoreSection.styles.js
import styled from "styled-components";

const S = {
  Container: styled.section`
    width: 100%;
    min-height: 100vh;
    background: ${({ $bg }) => ($bg ? `url("${$bg}") center/cover no-repeat` : "none")};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Container2: styled.div`
    display: flex;
    padding-top: 170px;
    padding-bottom: 170px;
    flex-direction: column;
    align-items: center;
    gap: 180px;
    align-self: stretch;
  `,

  ReportContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    align-self: stretch;
  `,

  Header: styled.header`
    display: flex;
    height: 98px;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
  `,

  Title: styled.h2`
    flex: 1 0 0;
    align-self: stretch;
    color: var(--Neutral-100, #F2F2F2);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  `,

  SubTitle: styled.div`
    display: flex;
    width: 1270px;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex: 1 0 0;
  `,
  SubTitle1: styled.span`
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
    display: flex;
    gap: 10px;
  `,
  SubTitle2: styled.span`
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
    display: flex;
    gap: 10px;
  `,
  SubTitle3: styled.span`
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
    display: flex;
    gap: 10px;
  `,

  Box1: styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--Primary-700, #003D99);
  `,

  Box2: styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--Primary-500, #06F);
  `,

  Box3: styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--Primary-300, #80B2FF);
  `,

  PrintShopContainer: styled.div`
    display: flex;
    width: 1280px;
    padding: 0 53.16px;
    align-items: center;
    gap: 32px;
  `,

  Content: styled.article`
    display: flex;
    width: 369.67px;
    height: 504px;
    padding: 30px 10px 34px 20px;
    flex-direction: column;
    gap: 110px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    border: 5px solid var(--Neutral-100, #F2F2F2);
    background: var(--Neutral-600, #1A1A1A);
  `,

  PrintInfo: styled.div`
    align-self: stretch;
    color: var(--Neutral-400, #808080);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  `,

  Content2: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 27px;
    align-self: stretch;
  `,

  PlaceInfo: styled.div`
    flex: 1 0 0;
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

  `,

  Score: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-self: stretch;
  `,

  Text: styled.div`
    color: var(--Neutral-100, #F2F2F2);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  `,

  TotalScore: styled.span`
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 96px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    gap: 15px;
    display: flex;
    letter-spacing: -1.92px;
    align-items: baseline;
  `,
  RealScore: styled.span`
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: -2px;
  `,

  BaseScore: styled.span`
    display: flex;
  `,
  // 점수 뱃지들
  Score1: styled.span`
    display: flex;
    width: 110px;
    height: 110px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    background: var(--Primary-700, #003D99);
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
  `,
  Score2: styled.span`
    display: flex;
    width: 110px;
    height: 110px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    background: var(--Primary-500, #06F);
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
  `,
  Score3: styled.span`
    display: flex;
    width: 110px;
    height: 110px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50%;
    background: var(--Primary-400, #4D94FF);
    color: var(--Neutral-100, #F2F2F2);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
  `,

  HomeButton: styled.button`
    display: flex;
    width: 700px;
    padding: 20px 100px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: var(--Neutral-100, #F2F2F2);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 20px;
    background: var(--Primary-500, #06F);
    cursor: pointer;
  `,
};

export default S;
