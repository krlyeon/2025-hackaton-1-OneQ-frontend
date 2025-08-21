import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 862px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  padding: 0 455px;
`;

export const Content = styled.div`
  display: flex;
  padding: 0 36px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  align-self: stretch;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const SectionTitle = styled.div`
  color: var(--Neutral-600, #1a1a1a);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
  align-self: stretch;
`;

export const InputBox = styled.div`
  display: flex;
  padding: 18px 22px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid var(--Neutral-300, #bfbfbf);
  background: var(--Neutral-100, #f2f2f2);
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 18px;
  font-family: Pretendard;
  color: var(--Neutral-600, #1a1a1a);

  &::placeholder {
    color: var(--Neutral-300, #bfbfbf);
  }
`;

export const InputDescription = styled.div`
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DeliveryHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const DeliveryDescription = styled.div`
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DeliveryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid var(--Neutral-300, #bfbfbf);
  background: var(--Neutral-200, #d9d9d9);
`;

export const DeliveryList = styled.div`
  display: flex;
  height: 132px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const DeliveryInputWrapper = styled.div`
  display: flex;
  width: 890px;
  height: 122px;
  max-height: 122px;
  padding: 12px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
`;

export const DeliveryInput = styled.input`
  display: flex;
  height: 48px;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: none;
  border-radius: 10px;

  font-size: 18px;
  font-family: Pretendard;
  font-weight: 400;
    color: var(--Neutral-300, #bfbfbf);
    

  &::placeholder {
    color: var(--Neutral-300, #bfbfbf);
  }
`;

export const DeliveryFooter = styled.div`
  display: flex;
  height: 48px;
  padding: 0 22px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: #4d4d4d;
`;

export const AddMore = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const AddIcon = styled.img`
  width: 28px;
  height: 28px;
`;

export const AddText = styled.div`
  color: var(--Neutral-300, #bfbfbf);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const Footer = styled.div`
  display: flex;
  padding: 0 36px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 15px;
background: var(--Neutral-400, #808080);
`;

export const BackIcon = styled.img`
  width: 17px;
  height: 20px;
`;

export const BackText = styled.div`
  color: var(--Neutral-100, #f2f2f2);
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const NextButton = styled.button`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 15px;
  background: ${props => props.active ? 'var(--Primary-500, #06F)' : 'var(--Neutral-400, #808080)'};
  border: none;
  cursor: pointer;
`;

export const NextText = styled.div`
  color: var(--Neutral-100, #f2f2f2);
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
`;

export const NextIcon = styled.img`
  width: 19px;
  height: 29px;
`;

export const DeliveryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  gap: 10px;
  align-self: stretch;
`;
