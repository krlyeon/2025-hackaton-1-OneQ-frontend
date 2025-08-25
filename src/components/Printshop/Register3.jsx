import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePrintshop } from "../../contexts/PrintshopContext";
import Modal3 from "../Common/Modal3";
import Modal6 from "../Common/Modal6";
import {
  Container,
  Menu,
  MenuInner,
  Frame7,
  CancelButton,
  Title,
  Frame67,
  MainWrapper,
  SectionTitle,
  UploadWrapper,
  UploadBox,
  UploadButton,
  UploadDesc,
  PasswordWrapper,
  InputBox,
  InputField,
  InputDesc,
  AgreementBox,
  AgreementRow,
  BackButton,
  SubmitButton,
} from "./Register3.styles";

import uploadIcon from "../../assets/Printshop/upload.png";
import checkIcon from "../../assets/Printshop/check-register.png";
import checkedIcon from "../../assets/Printshop/checked-register.png";
import leftIcon from "../../assets/Printshop/left-register.png";
import passwordCheckIcon from "../../assets/Printshop/passwordcheck.png";

const Register3 = () => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const { printshopId: contextId } = usePrintshop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the ID from URL params first, then fall back to context
  const printshopId = paramId || contextId;
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [agree, setAgree] = useState(false);

  // 비밀번호 유효성 검사
  const isPasswordValid =
    password.length >= 4 &&
    password.length <= 20 &&
    /[^a-zA-Z0-9]/.test(password);

  const isPasswordMatch = confirmPassword === password && isPasswordValid;

  // 등록 버튼 활성화 조건
  const isFormValid = file && isPasswordValid && isPasswordMatch && agree;
  const canSubmit = isFormValid && !isSubmitting;

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);
      setError("");

      // Check registration status before proceeding
      const statusRes = await fetch(
        `${import.meta.env.VITE_API_BASE}printshops/${printshopId}/registration-status/`
      );
      const statusJson = await statusRes.json();
      if (statusJson?.status !== 'step2') {
        throw new Error('2단계를 먼저 완료해주세요. (현재 상태: ' + statusJson?.status + ')');
      }

      // Create FormData
      const formData = new FormData();
      formData.append("password", password);
      formData.append("password_confirm", confirmPassword);
      formData.append("business_license", file);

      if (!printshopId) {
        throw new Error('인쇄소 ID를 찾을 수 없습니다.');
      }

      const apiUrl = `${import.meta.env.VITE_API_BASE}printshops/${printshopId}/finalize/`;
      console.log('API URL:', apiUrl);
      console.log('Request Data:', {
        password: password,
        password_confirm: confirmPassword,
        business_license: file ? file.name : 'No file'
      });

      // Make the finalize API call
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Response Status:', response.status);
      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        let errorMessage = "등록 중 오류가 발생했습니다. 다시 시도해주세요.";
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = `서버 오류 (${response.status}): ${text.substring(0, 100)}...`;
        }
        throw new Error(errorMessage);
      }

      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      console.error("등록 오류:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/printshopPage");
  };

  return (
    <Container>
      {/* 메뉴 헤더 */}
      <Menu>
        <MenuInner>
          <Frame7>
            <CancelButton onClick={() => setShowCancelModal(true)}>
              취소하기
            </CancelButton>
            <Title>인쇄소 등록 [3/3]</Title>
            <Frame67 />
          </Frame7>
        </MenuInner>
      </Menu>

      {/* 메인 */}
      <MainWrapper>
        <SectionTitle>인증 및 보안 설정</SectionTitle>

        {/* 업로드 */}
        <UploadWrapper>
          <div className="label">
            사업자등록증 업로드 <span className="required">*</span>
          </div>
          <div>
            <UploadBox>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="fileUpload">
                <UploadButton>
                  <img src={uploadIcon} alt="upload" />
                  파일선택
                </UploadButton>
              </label>
              {file && <div>{file.name}</div>}
            </UploadBox>
            <UploadDesc>
              사업자등록증 전체가 보이도록 사진을 업로드해주세요. (PDF/JPG/PNG,
              최대 10MB)
            </UploadDesc>
          </div>
        </UploadWrapper>

        {/* 비밀번호 설정 */}
        <PasswordWrapper>
          <div className="label">
            비밀번호 설정 <span className="required">*</span>
          </div>
          <InputBox $isValid={isPasswordValid}>
            <InputField
              type="password"
              placeholder="인쇄소 정보 관리 시 사용할 비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordValid && <img src={passwordCheckIcon} alt="ok" />}
          </InputBox>
          <InputDesc>
            비밀번호는 4~20자 이내이며, 특수문자를 최소 1개 포함해야 합니다.
          </InputDesc>
        </PasswordWrapper>

        {/* 비밀번호 확인 */}
        <PasswordWrapper>
          <div className="label">
            비밀번호 확인 <span className="required">*</span>
          </div>
          <InputBox $isValid={isPasswordMatch}>
            <InputField
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isPasswordMatch && <img src={passwordCheckIcon} alt="ok" />}
          </InputBox>
          <InputDesc>입력한 비밀번호가 동일한지 확인합니다.</InputDesc>
        </PasswordWrapper>

        {/* 동의 체크박스 */}
        <AgreementBox>
          <AgreementRow onClick={() => setAgree(!agree)}>
            <img src={agree ? checkedIcon : checkIcon} alt="check" />
            <span className={agree ? "checked" : ""}>
              개인정보 수집 및 이용에 동의합니다.
            </span>
          </AgreementRow>
        </AgreementBox>

        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "60%",
            marginBottom: "36px",
          }}
        >
          <SubmitButton 
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            style={{ opacity: isFormValid ? 1 : 0.5 }}
          >등록
          </SubmitButton>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
      </MainWrapper>
      {showCancelModal && (
        <Modal3 
          onClose={() => setShowCancelModal(false)}
          onConfirm={() => navigate('/printshopPage')}
        />
      )}
      {showSuccessModal && (
        <Modal6
          onClose={() => setShowSuccessModal(false)}
          onConfirm={handleSuccessConfirm}
        />
      )}
    </Container>
  );
};

export default Register3;
