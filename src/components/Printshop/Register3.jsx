import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePrintshop } from "../../contexts/PrintshopContext";
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

      // FormData 생성
      const formData = new FormData();
      formData.append("password", password);
      formData.append("password_confirm", confirmPassword);
      formData.append("business_license", file);

      if (!printshopId) {
        throw new Error('인쇄소 ID를 찾을 수 없습니다.');
      }

      // API 호출
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}printshops/${printshopId}/finalize/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
          // credentials: 'include' // 쿠키 기반 인증이 필요한 경우
        }
      );

      const contentType = response.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || '서버에서 잘못된 응답을 받았습니다.');
      }

      if (!response.ok) {
        throw new Error(
          responseData.error || 
          responseData.detail ||
          responseData.password_confirm || 
          responseData.password?.[0] ||
          responseData.business_license?.[0] ||
          '등록에 실패했습니다.'
        );
      }

      if (responseData.status === "completed") {
        // 등록 완료 후 리다이렉트
        navigate("/printshopPage");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      {/* 메뉴 헤더 */}
      <Menu>
        <MenuInner>
          <Frame7>
            <CancelButton onClick={() => navigate("/printshopPage")}>
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
            justifyContent: "space-between",
            width: "60%",
            marginBottom: "36px",
          }}
        >
          <BackButton type="button" onClick={() => window.history.back()}>
            <img src={leftIcon} alt="back" />
            뒤로
          </BackButton>
          <SubmitButton 
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            style={{ opacity: isFormValid ? 1 : 0.5 }}
          >
            {isSubmitting ? '처리 중...' : '등록'}
          </SubmitButton>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
      </MainWrapper>
    </Container>
  );
};

export default Register3;
