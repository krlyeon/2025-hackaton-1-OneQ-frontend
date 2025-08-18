import styled from "styled-components";

const Section = styled.section`
  display: flex;
  width: 1280px;
  flex-direction: column;
  align-items: center;
  gap: 68px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1176px;
  margin: 0 auto;
`;

const CardArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1176px;
  margin: 0 auto;
`;

const TitleArea = styled.div`
  display: flex;
  width: 1176px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 108px;
  margin-bottom: 42px;
`;

const Title = styled.h2`
  align-self: stretch;
  color: var(--Neutral-600, #1a1a1a);
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: 0;
`;

const SubTitle = styled.p`
  color: var(--Primary-500, rgb(77, 77, 77));
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  margin: 0;
`;

const CardSliderArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1116.8px;
  margin: 0 auto;
`;

const CardListWrapper = styled.div`
  display: flex;
  width: 1116.8px;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
  overflow: hidden;
  margin: 0 0;
`;

const CardList = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  flex-shrink: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 1116.8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 345.6px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 32px;
  box-sizing: border-box;
  transition: background 0.2s;
`;

const CardTitle = styled.span`
  color: var(--Neutral-100, #f2f2f2);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  z-index: 1;
`;

const CheckIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

const ScrollbarArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1176px;
  margin: 20px auto 25px auto;
`;

const ScrollbarTrack = styled.div`
  position: relative;
  display: flex;
  width: 1176px;
  height: 10px;
  padding: 0px 12px;
  align-items: center;
  border-radius: 5px;
  background: var(--Neutral-200, #d9d9d9);
  cursor: pointer;
`;

const ScrollbarThumb = styled.div`
  position: absolute;
  width: 168px;
  height: 10px;
  border-radius: 5px;
  background: var(--Neutral-400, #808080);
  transition: left 0.1s ease;
  top: 0px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1176px;
  margin: 0px auto;
`;

const StartButton = styled.button`
  width: 1176px;
  height: 72px;
  padding: 26px 400px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background: ${({ disabled }) =>
    disabled ? "var(--Neutral-300, #BFBFBF)" : "var(--Primary-500, #06F)"};

  color: ${({ disabled }) =>
    disabled ? "var(--Neutral-400, #808080)" : "var(--Neutral-100, #F2F2F2)"};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */

  &:disabled {
    cursor: not-allowed;
  }
`;

const S = {
  Section,
  Content,
  CardArea,
  TitleArea,
  Title,
  SubTitle,
  CardSliderArea,
  CardListWrapper,
  CardList,
  Card,
  CardTitle,
  CheckIcon,
  ScrollbarArea,
  ScrollbarTrack,
  ScrollbarThumb,
  ButtonArea,
  StartButton,
};

export default S;
