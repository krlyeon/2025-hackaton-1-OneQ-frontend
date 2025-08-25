import styled from "styled-components";

export const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px var(--Desktop-Margin, 32px) 10px var(--Desktop-Margin, 32px);
  background: rgb(26, 26, 26);
  box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 55px;
  gap: 0;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Center = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  flex: 1;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    aspect-ratio: 1/1;
    object-fit: contain;
  }
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 3px 5px 4px;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export const StepNumberChecked = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: var(--Primary-500, #06f);

  color: var(--Neutral-100, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StepLabelChecked = styled.span`
  color: var(--Neutral-100, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StepNumber = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-300, #bfbfbf);
  background: none;

  color: var(--Neutral-300, #bfbfbf);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
  }
`;

export const StepLabel = styled.span`
  color: var(--Neutral-300, #bfbfbf);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Advice = styled.span`
  display: flex;
  width: 14px;
  height: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-500, #4d4d4d);

  color: var(--Neutral-500, #4d4d4d);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DottedLine = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 2px;
  }
`;

export const Balloon = styled.div`
  position: absolute;
  top: 90px;
  left: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  fill: var(--Neutral-100, #f2f2f2);
  stroke-width: 1px;
  stroke: var(--Neutral-300, #bfbfbf);
  filter: drop-shadow(10px 4px 20px rgba(0, 0, 0, 0.3));
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent; /* 20px/2 */
  border-right: 10px solid transparent;
  border-bottom: 16px solid var(--Neutral-100, #f2f2f2);
`;

export const BalloonBox = styled.div`
  width: 310px;
  height: 40px;
  border-radius: 10px;
  background: var(--Neutral-100, #f2f2f2);
  padding: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  padding-bottom: 25px;
    padding-left: 15px;
`;
