import styled from "styled-components";
import bgImage from "../../assets/Printshop/printshopHome.png";

export const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
  position: relative;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 645px;
  flex-direction: column;
  align-items: flex-start;
  gap: 46px;
  position: absolute;
  top: 208px;
  left: 66px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  align-self: stretch;
`;

export const Title = styled.h1`
  align-self: stretch;
  color: var(--Neutral-100, #f2f2f2);
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: 0;
`;

export const Description = styled.p`
  align-self: stretch;
  color: var(--Neutral-200, #d9d9d9);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  margin: 0;
`;

export const RegisterButton = styled.button`
  display: flex;
  padding: 20px 100px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary-500, #06f);
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
