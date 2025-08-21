import styled from "styled-components";

const S = {
  Container: styled.section` 
    width: 100%;
    height: 100vh; /* 높이도 설정해야 화면에 보입니다 */
    background-image: url(${(props) => props.$bg});
    background-size: cover;
    background-position: center;
    position: relative;

    `,

  LogoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: absolute;
    top: 270px;
    left: 120px;
  `,

  BigLogo: styled.img`
    display: flex;
    `,

    SubTitle: styled.div`
    color: var(--Neutral-100, #F2F2F2);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    padding-left: 10px;
  `,

  };

export default S;