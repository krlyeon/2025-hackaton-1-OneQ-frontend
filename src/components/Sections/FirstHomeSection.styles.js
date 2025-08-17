import styled from "styled-components";

const S = {
  Container: styled.section` 
    width: 100%;
    background: rgb(26 26 26);
    `,

  LogoContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  BigLogo: styled.img`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    `,

  Line: styled.div`
    width: 100%;
    height: 8px;
    flex-shrink: 0;
    background: var(--Primary-700, #003D99);
  `,
  BottomSection: styled.div`
    display: flex;
    padding: 10px 52px 48px 52px;
    align-items: flex-start;
    align-self: stretch;
    background: rgb(26 26 26);
    gap: 250px;
    align-items: center;
  `,
  Title: styled.h1`
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;

`,
  Chevron: styled.img`
  transition: all 0.3s ease;
      cursor: pointer;
    `,
  };

export default S;