import styled from "styled-components";

export const Container = styled.section.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})`
  background: ${({ backgroundImage }) =>
    `url(${backgroundImage}) no-repeat center/cover`};
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: var(--Neutral-100, #f2f2f2);
  font-family: "GmarketSans", "Gmarket Sans", sans-serif;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 96px */
  margin-top: 261px;
  margin-bottom: 12px;

  span {
    color: var(--Primary-500, #06f);
    background: var(--Neutral-100, #f2f2f2);
    display: inline-block;
    line-height: 1.15;
  }
`;

export const Subtitle = styled.p`
  color: var(--Neutral-100, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  margin-bottom: 57px;
`;

export const CardGrid = styled.div`
  display: flex;
  padding: 0 var(--Desktop-Margin, 32px);
  justify-content: center;
  gap: 24px;
  align-self: stretch;
`;
export const Card = styled.div`
  width: 389px;
  height: 307px;

  border-radius: 30px;
  border: 0 solid var(--Neutral-100, #f2f2f2);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.25);
  padding-left: 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    background: linear-gradient(
      180deg,
      rgba(26, 26, 26, 0.15) 0%,
      rgba(26, 26, 26, 0.35) 100%
    );
  }
`;

export const Icon = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  margin-top: 81px;
`;

export const CardTitle = styled.h3`
  color: var(--Neutral-100, #f2f2f2);

  /* Shadow-Soft */
  text-shadow: 10px 10px 40px rgba(0, 0, 0, 0.3);

  /* Header/H3 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  margin-top: 21px;
`;

export const CardDesc = styled.p`
  color: var(--Neutral-100, #f2f2f2);

  /* Shadow-Soft */
  text-shadow: 10px 10px 40px rgba(0, 0, 0, 0.3);

  /* Body/Large1 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  opacity: 0.7;

  margin: 0;
  margin-top: 7px;
`;
