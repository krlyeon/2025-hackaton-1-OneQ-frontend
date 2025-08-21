import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  width: 100%;
  padding-top: 32px;
  flex-direction: column;
  align-items: flex-start;
  background: #1a1a1a;
`;

export const MenuInner = styled.div`
  display: flex;
  padding: 10px 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.3);
`;

export const Frame7 = styled.div`
  display: flex;
  height: 55px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CancelButton = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #f2f2f2;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const Title = styled.div`
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
`;

export const Frame67 = styled.div`
  display: flex;
  width: 89px;
`;

export const MainWrapper = styled.div`
  display: flex;
  width: 1280px;
  padding: 0 259px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const SectionTitle = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: #1a1a1a;
  align-self: flex-start;
  margin-left: 255px;
  margin-top: 79px;
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 762px;

  .label {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    .required {
      color: #cd2020;
    }
  }
`;

export const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  background: #d9d9d9;
  padding: 28px 300px;
`;

export const UploadButton = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 4px;
  border-radius: 5px;
  background: #06f;
  color: #f2f2f2;
  cursor: pointer;
  justify-content: center;
`;

export const UploadDesc = styled.div`
  font-size: 12px;
  color: #808080;
  margin-top: 11px;
`;

export const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 762px;

  .label {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    .required {
      color: #cd2020;
    }
  }
`;

export const InputBox = styled.div`
  display: flex;
  padding: 18px 22px;
  border-radius: 20px;
  border: 1px solid ${({ valid }) => (valid ? "#06f" : "#bfbfbf")};
  background: #f2f2f2;
  justify-content: space-between;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const InputField = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: #808080;
  outline: none;
`;

export const InputDesc = styled.div`
  font-size: 12px;
  color: #808080;
`;

export const AgreementBox = styled.div`
  display: flex;
  width: 762px;
  flex-direction: column;
  gap: 10px;
`;

export const AgreementRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 16px;
    color: #808080;
  }

  span.checked {
    color: #1a1a1a;
  }
`;

export const BackButton = styled.div`
  display: flex;
  padding: 10px 20px;
  border-radius: 15px;
  background: #808080;
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
  gap: 6px;
  cursor: pointer;
  align-items: center;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const SubmitButton = styled.div`
  display: flex;
  width: 100px;
  padding: 10px 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background: ${({ canSubmit }) => (canSubmit ? "#1a1a1a" : "#808080")};
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
  cursor: ${({ canSubmit }) => (canSubmit ? "pointer" : "not-allowed")};
`;
