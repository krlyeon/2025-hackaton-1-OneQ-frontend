import styled from "styled-components";

const S = {
  Container: styled.section` 
    width: 100%;
    height: 1258px;
    background-size: cover;
    background-position: center;
    position: relative;
    display:flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    background: ${({ $bg }) => $bg ? `url("${$bg}") center/cover no-repeat` : "none"};

    `,
    ReportContainer: styled.div`
    display: flex;
    width: 808px;
    flex-direction: column;
    align-items: center;
    gap: 120px;
    justify-content: center;

  `,

  Title: styled.h2`
    align-self: stretch;
    color: var(--Neutral-100, #F2F2F2);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  `,

  ContentContainer: styled.div`
    display: flex;
    width: 808px;
    height: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 20px;
    border: 2px solid var(--Neutral-300, #BFBFBF);
    box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.30);
  `,

  Header: styled.div`
    display: flex;
    height: 49px;
    padding: 12px 28px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px 10px 0 0;
    background: var(--Neutral-100, #F2F2F2);
  `,

  Vector: styled.div`
    width: 758px;
    height: 1px;
    stroke-width: 1px;
    stroke: var(--Neutral-300, #BFBFBF);
  `,

  Content: styled.div`
    display: flex;
    padding: 12px 28px 18px 28px;
    align-items: center;
    gap: 12px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 0 0 20px 20px;
    background: var(--Neutral-100, #F2F2F2);
  `,

  Context: styled.p`
    color: var(--Neutral-500, #4D4D4D);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 30px */
  `,

  };

export default S;