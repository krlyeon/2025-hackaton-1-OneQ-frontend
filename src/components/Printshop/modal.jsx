import React, { useState } from "react";
import {
  Overlay,
  ModalBox,
  ModalHeader,
  CloseWrapper,
  CloseIcon,
  ModalContent,
  TextContainer,
  TitleText,
  SubText,
  InputSection,
  InputField,
  InputWrapper,
  PasswordInput,
  ButtonContainer,
  StyledSubmitButton,
  SubmitIcon,
} from "./modal.styles";
import useModal from "../../hooks/useModal";

import closeIcon from "../../assets/Printshop/close.png";
import rightArrow from "../../assets/Printshop/right-register.png";

function Modal() {
  const [password, setPassword] = useState("");
  const { isOpen, closeModal } = useModal(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 4) return;
    console.log("Password submitted:", password);
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <ModalHeader>
          <CloseWrapper onClick={closeModal}>
            <CloseIcon src={closeIcon} alt="close" />
          </CloseWrapper>
        </ModalHeader>

        <ModalContent>
          <TextContainer>
            <TitleText>인증이 필요합니다.</TitleText>
            <SubText>열람하거나 수정하려면 비밀번호를 입력하세요.</SubText>
          </TextContainer>

          <InputSection>
            <InputField>
              <InputWrapper>
                <PasswordInput 
                  type="password" 
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </InputWrapper>
            </InputField>
            <ButtonContainer>
              <StyledSubmitButton 
                onClick={handleSubmit} 
                $active={password.length >= 4}
              >
                <SubmitIcon src={rightArrow} alt="submit" />
              </StyledSubmitButton>
            </ButtonContainer>
          </InputSection>
        </ModalContent>
      </ModalBox>
    </Overlay>
  );
}

export default Modal;
