import React from "react";
import {
  Overlay,
  ModalBox,
  HeaderSection,
  CloseWrapper,
  CloseIcon,
  TitleSection,
  TitleText,
  SubText,
  ContentSection,
  InputWrapper,
  InputBox,
  PasswordInput,
  ActionWrapper,
  SubmitButton,
  SubmitIcon,
} from "./modal.styles";

import closeIcon from "../../assets/Printshop/close.png";
import rightArrow from "../../assets/Printshop/right-register.png";

function Modal() {
  return (
    <Overlay>
      <ModalBox>
        {/* 상단 */}
        <HeaderSection>
          <CloseWrapper>
            <CloseIcon src={closeIcon} alt="close" />
          </CloseWrapper>
        </HeaderSection>

        {/* 타이틀 영역 */}
        <TitleSection>
          <TitleText>인증이 필요합니다.</TitleText>
          <SubText>열람하거나 수정하려면 비밀번호를 입력하세요.</SubText>
        </TitleSection>

        {/* 비밀번호 입력 + 버튼 */}
        <ContentSection>
          <InputWrapper>
            <InputBox>
              <PasswordInput type="password" />
            </InputBox>
          </InputWrapper>

          <ActionWrapper>
            <SubmitButton>
              <SubmitIcon src={rightArrow} alt="submit" />
            </SubmitButton>
          </ActionWrapper>
        </ContentSection>
      </ModalBox>
    </Overlay>
  );
}

export default Modal;
