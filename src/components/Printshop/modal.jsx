import React, { useState, useEffect } from "react";
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
  ErrorMessage,
} from "./modal.styles";
import useModal from "../../hooks/useModal";
// Using fetch API instead of axios

import closeIcon from "../../assets/Printshop/close.png";
import rightArrow from "../../assets/Printshop/right-register.png";

function Modal({ isOpen, onClose, printshop: selectedPrintshop }) {
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Use the provided onClose prop if available, otherwise use the one from useModal
  const modal = useModal(isOpen);
  const closeModal = onClose || modal.closeModal;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyPassword = async () => {
    console.log('verifyPassword called');
    if (password.length < 4 || !selectedPrintshop?.id) {
      console.log('verifyPassword early return - password too short or no printshop ID');
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}printshops/${selectedPrintshop.id}/verify-password/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password })
        }
      );
      
      const data = await response.json();
      
      if (data.message === "비밀번호가 확인되었습니다.") {
        setIsVerified(true);
        alert("확인되었습니다");
        // Redirect to edit mode with the printshop ID
        window.location.href = `/printshopRegister?edit=true&id=${selectedPrintshop.id}`;
      } else {
        alert("비밀번호가 올바르지 않습니다");
      }
    } catch (err) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsVerified(false);
      alert("비밀번호가 올바르지 않습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    console.log('Password length:', password.length);
    console.log('Selected printshop ID:', selectedPrintshop?.id);
    if (password.length < 4) {
      console.log('Password too short');
      return;
    }
    console.log('Calling verifyPassword');
    verifyPassword();
  };

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setIsVerified(false);
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset verification state when password changes
    if (password.length < 4) {
      setIsVerified(false);
      setError("");
    }
  }, [password]);

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

          <form onSubmit={handleSubmit}>
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
                  type="submit"
                  $active={password.length >= 4}
                  $verified={isVerified}
                  disabled={isLoading}
                >
                  <SubmitIcon src={rightArrow} alt="submit" />
                </StyledSubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </ButtonContainer>
            </InputSection>
          </form>
        </ModalContent>
      </ModalBox>
    </Overlay>
  );
}

export default Modal;
