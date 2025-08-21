import React, { useState } from "react";
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

import { useNavigate } from "react-router-dom";

const Register3 = () => {
  const navigate = useNavigate();

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
  const canSubmit = file && isPasswordValid && isPasswordMatch && agree;

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
          <InputBox valid={isPasswordValid}>
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
          <InputBox valid={isPasswordMatch}>
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
          <BackButton>
            <img src={leftIcon} alt="back" />
            뒤로
          </BackButton>
          <SubmitButton canSubmit={canSubmit}>등록</SubmitButton>
        </div>
      </MainWrapper>
    </Container>
  );
};

export default Register3;
