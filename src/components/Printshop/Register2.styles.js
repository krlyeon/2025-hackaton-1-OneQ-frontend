import styled from "styled-components";

/* 전체 레이아웃 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 상단 메뉴 */
export const Menu = styled.div`
  display: flex;
  width: 100%;
  padding-top: 32px;
  flex-direction: column;
  align-items: flex-start;
  background: var(--Neutral-600, #1A1A1A);
`;

export const MenuInner = styled.div`
  display: flex;
  padding: 10px 32px;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  background: transparent;
  box-shadow: 10px 10px 40px 0 rgba(0,0,0,0.3);
`;

export const TopBar = styled.div`
  display: flex;
  height: 55px;
  justify-content: space-between;
  align-items: center;
`;

export const CancelBtn = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #f2f2f2;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
`;

export const Title = styled.div`
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
`;

export const StepBox = styled.div`
  display: flex;
  width: 89px;
  align-items: center;
  gap: 5px;
`;

/* 메인 */
export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 223px;
  flex-direction: column;
  align-items: center;
margin-bottom: 50px;
`;

export const SectionTitle = styled.h1`
  padding-right: 570px;
  margin-top: 80px;
  font-size: 40px;
  font-weight: 800;
  color: #1a1a1a;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

/* 설명 */
export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 36px;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const Caption = styled.div`
  font-size: 12px;
  color: #808080;
  margin-top: 4px;
`;

export const CardSelect = styled.div`
  display: flex;
  gap: 23px;
  padding: 0 36px;
`;

export const CardOption = styled.div`
  display: flex;
  width: 66px;
  padding: 8px 12px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  border: 1px solid ${props => {
    if (props.saved) return 'var(--Primary-500, #06F)';
    if (props.selected) return 'var(--Neutral-600, #1A1A1A)';
    return '#bfbfbf';
  }};
  cursor: pointer;

  img {
    width: 31px;
    height: 22px;
    stroke: ${props => {
      if (props.saved) return 'var(--Primary-500, #06F)';
      if (props.selected) return 'var(--Neutral-600, #1A1A1A)';
      return 'inherit';
    }};
  }

  span {
    font-size: 16px;
    color: ${props => {
      if (props.saved) return 'var(--Primary-500, #06F)';
      if (props.selected) return 'var(--Neutral-600, #1A1A1A)';
      return '#bfbfbf';
    }};
  }
`;

/* 카드 입력 */
export const InputCard = styled.div`
  display: flex;
  width: 834px;
  height: 1133px;
  padding: 26px 36px;
  flex-direction: column;
  gap: 22px;
  border-radius: 20px;
  border: 1px solid #1a1a1a;
  background: #f2f2f2;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 1020px;
  gap: 56px;
  margin-bottom: 48px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  background: #d9d9d9;
`;

export const InputList = styled.div`
  display: flex;
  flex-direction: column;
  height: 276px;
  padding: 0 12px;
  margin-top: 10px;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;
  background: #f2f2f2;
  border-radius: 5px;
  gap: 10px;

  img {
    width: 1px;
    height: 24px;
  }
`;

export const InputText = styled.input`
  flex: 1;
  font-size: 18px;
  color: #bfbfbf;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #bfbfbf;
  }
`;

export const MinOrderInput = styled.input`
  flex: 1;
  font-size: 18px;
  color: #bfbfbf;
  border: 1px solid var(--Neutral-300, #BFBFBF);
  border-radius: 20px;
  background: var(--Neutral-100, #F2F2F2);
  outline: none;
  padding: 12px 16px;

  &::placeholder {
    color: #bfbfbf;
  }
`;

export const AddRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  gap: 4px;
  background: #4d4d4d;
  border-radius: 0 0 10px 10px;
  cursor: pointer;

  img {
    width: 28px;
    height: 28px;
  }

  span {
    font-size: 18px;
    color: #bfbfbf;
  }
`;

/* 하단 */
export const Footer = styled.div`
  display: flex;
  width: 835px;
  flex-direction: column;
  align-items: center;
  gap: 44px;
`;

export const MinOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const SubmitBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background: #06f;
  color: #f2f2f2;
  font-size: 16px;
  cursor: pointer;
  border: none;
  align-self: center;
`;

/* Register2-2 스타일 추가 */
export const ThreeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const ThreeSectionTitle = styled.div`
  color: var(--Neutral-600, #1a1a1a);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const ThreeInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
  align-self: stretch;
`;

export const ThreeInputBox = styled.div`
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

export const ThreeInput = styled.input`
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

export const ThreeInputDescription = styled.div`
  color: var(--Neutral-400, #808080);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ThreeDeliveryHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const ThreeDeliveryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid var(--Neutral-300, #bfbfbf);
  background: var(--Neutral-200, #d9d9d9);
`;

export const ThreeDeliveryList = styled.div`
  display: flex;
  height: 132px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const ThreeDeliveryInputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 122px;
  max-height: 122px;
  padding: 12px 10px;
  flex-direction: column;
width: 97%;
  gap: 8px;
  flex-shrink: 0;
`;

export const ThreeDeliveryInput = styled.input`
  display: flex;
  height: 48px;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: none;
  border-radius: 10px;
  background: #f2f2f2;

  font-size: 18px;
  font-family: Pretendard;
  font-weight: 400;
  color: var(--Neutral-600, #1a1a1a);

  &::placeholder {
    color: var(--Neutral-300, #bfbfbf);
  }
`;

export const ThreeDeliveryFooter = styled.div`
  display: flex;
  height: 48px;
  padding: 0 22px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: #4d4d4d;
  border-radius: 0 0 10px 10px;
`;

export const ThreeAddMore = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const ThreeCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 1020px;
  margin-bottom: 48px;
`;