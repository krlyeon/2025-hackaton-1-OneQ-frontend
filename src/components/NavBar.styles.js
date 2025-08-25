import styled from "styled-components";

const N = {
  Header: styled.section`
    display: flex;
    width: 100%;
    padding-top: 32px;
    flex-direction: column;
    background: rgb(26 26 26);
    align-items: flex-start;
  `,

  NavContainer: styled.div`
    display: flex;
    height: 55px;
    align-items: center;
    background: rgb(26 26 26);
    box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    padding: 10px var(--Desktop-Margin, 32px);
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    align-self: stretch;
  `,

  SmallLogo: styled.img`
    display: flex;
    width: 96px;
    height: 34.56px;
    padding: 3.2px 0.32px 1.21px 3.293px;
    justify-content: center;
    align-items: flex-start;
    gap: 3.2px;
    position: absolute;
    left: 26px;
    cursor: pointer;
  `,

  NavMenu: styled.nav`
    display: flex;
    align-items: center;
    align-self: stretch;
  `,

  NavItem: styled.a`
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    color: var(--Neutral-100, #f2f2f2);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &:hover {
      color: #0066ff; /* 호버 시 파란색 */
      cursor: pointer;
    }

    &:nth-child(3) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

    &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;       /* 글자 아래 간격 */
    height: 3px;
    border-radius: 2px;
    background: #2f80ed;     /* 파란색 라인 */
    transform: scaleX(${p => (p.$active ? 1 : 0)});
    transform-origin: left center;
    transition: transform 0.2s ease-in-out;
  }
    }
  `,

  HighlightText: styled.nav`
    border-radius: 20px;
    background: var(--Primary-500, #06f);
    color: var(--Neutral-100, #f2f2f2);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 10px 20px;

    &:hover {
      border: 2px solid var(--Neutral-100, #f2f2f2);
      color: #f2f2f2;
      background-color: black;
    }
  `,
};

export default N;
