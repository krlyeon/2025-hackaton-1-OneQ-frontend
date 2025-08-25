import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);  
`;

export const ModalBox = styled.div`
  display: flex;
  width: 600px;
  height: 310px;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  border-radius: 20px;
background: var(--Neutral-100, #F2F2F2);
box-shadow: 0 40px 30px 0 rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  display: flex;
  padding: 22px 24px 10px 10px;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
`;

export const CloseWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: var(--Neutral-400, #808080);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 44px;
  align-self: stretch;
  padding: 40px 64px 64px 64px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const TitleText = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

export const SubText = styled.p`
  color: var(--Neutral-500, #4D4D4D);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

export const InputSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
`;

export const InputField = styled.div`
  display: flex;
  width: 413px;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
`;

export const InputWrapper = styled.div`
  display: flex;
  height: 29px;
  padding: 22px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background: #D9D9D9;
`;

export const PasswordInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--Neutral-600, #1A1A1A);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  
  &::placeholder {
    color: var(--Neutral-400, #808080);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding-top: 16.1px;
  align-items: center;
  gap: 10px;
`;

export const StyledSubmitButton = styled.button`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 10px;
  background: ${props => 
    props.$verified ? 'var(--Primary-500, #06F)' : 
    props.$active ? 'var(--Primary-500, #06F)' : 'var(--Neutral-400, #808080)'};
  width: 35px;
  height: 33px;
  border: none;
  cursor: ${props => (props.$active && !props.disabled) ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.2s ease;
`;

export const SubmitIcon = styled.img`
  width: 20px;
  height: 25px;
  aspect-ratio: 1/1;
`;

export const ErrorMessage = styled.p`
  color: #FF3333;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 8px 0 0 0;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
`;

