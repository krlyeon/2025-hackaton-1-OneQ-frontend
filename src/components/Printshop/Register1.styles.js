import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f2;
  min-height: 100vh;
`;

// 헤더 영역
export const Header = styled.div`
  display: flex;
  width: 100%;
  padding-top: 32px;
  flex-direction: column;
  align-items: flex-start;
  background: #1a1a1a;
`;

export const HeaderMenu = styled.div`
  display: flex;
  padding: 10px 32px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.3);
`;

export const CancelButton = styled.button`
  display: flex;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #f2f2f2;
  background: transparent;
  cursor: pointer;
`;

export const CancelText = styled.span`
  color: #f2f2f2;
  font-size: 14px;
  font-weight: 600;
`;

export const Title = styled.h2`
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
`;

// 입력폼
export const FormWrapper = styled.div`
  display: flex;
  width: 1280px;
  padding: 0 259px;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  h1 {
    font-size: 40px;
    font-weight: 800;
    color: #1a1a1a;
    align-self: flex-start;
    margin-left: 260px;
    margin-top: 79px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 762px;
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const Required = styled.span`
  color: #cd2020;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  background: #f2f2f2;
  padding: 18px 22px;
  width: 100%;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;

  ::placeholder {
    color: #808080;
    font-size: 14px;
  }
`;

export const TextArea = styled.textarea`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  resize: none;
  height: 120px;

  ::placeholder {
    color: #808080;
    font-size: 14px;
  }
`;

export const Caption = styled.p`
  color: #808080;
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
`;

// 레이아웃
export const Row = styled.div`
  display: flex;
  gap: 80px;
  width: 762px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

// 버튼
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 762px;
  padding-bottom: 28px;
  margin-left: 95px;
`;

export const NextButton = styled.button`
  display: flex;
  padding: 10px 20px;
  gap: 6px;
  border-radius: 15px;
  background: ${({ $active }) => ($active ? "#06F" : "#808080")};
  cursor: pointer;
  border: none;
  align-items: center;
`;

export const NextText = styled.span`
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
`;

export const NextIcon = styled.img`
  width: 19px;
  height: 29px;
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  color: #cd2020;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  background: #ffe6e6;
  border: 1px solid #cd2020;
  border-radius: 8px;
  width: 762px;
  text-align: center;
`;
