import styled from "styled-components";

// 전체 감싸는 레이어 (검정 배경 지정은 필요 없다고 하셔서 뺐습니다)
export const Overlay = styled.div`
  display: flex;
  width: 1280px;
  height: 849px;
  padding: 125px 119px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

// 모달 박스
export const ModalBox = styled.div`
  display: flex;
  width: 600px;
  height: 310px;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f5f5f5;
`;

// 상단 닫기 버튼 영역
export const HeaderSection = styled.div`
  display: flex;
  padding: 22px 24px 10px 10px;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: stretch;
`;

export const CloseWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

export const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: var(--Neutral-400, #808080);
  cursor: pointer;
`;

// 타이틀 영역
export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export const TitleText = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
`;

export const SubText = styled.p`
  color: var(--Neutral-500, #4d4d4d);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
`;

// 내용 영역
export const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-top: 40px;
`;

// 입력 필드
export const InputWrapper = styled.div`
  display: flex;
  width: 413px;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
`;

export const InputBox = styled.div`
  display: flex;
  height: 69px;
  padding: 22px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  background: #d9d9d9;
  width: 100%;
`;

export const PasswordInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  color: var(--Neutral-600, #1a1a1a);
`;

// 버튼 영역
export const ActionWrapper = styled.div`
  display: flex;
  padding-top: 16.1px;
  align-items: center;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  display: flex;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--Primary-500, #06f);
  border: none;
  cursor: pointer;
`;

export const SubmitIcon = styled.img`
  width: 28.8px;
  height: 28.8px;
  transform: rotate(90deg);
`;
