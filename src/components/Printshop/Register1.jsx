import React, { useState, useEffect } from "react";
import * as R from "./Register1.styles";
import RightRegister from "../../assets/Printshop/right-register.png";
import { useNavigate } from "react-router-dom";

const Register1 = () => {
  const navigate = useNavigate();

  // 필수 입력값 state
  const [printShopName, setPrintShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // 로딩 및 에러 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 버튼 활성화 여부
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 개발 중에만 찍어봐
    console.log("Register1.styles keys:", Object.keys(R));
  }, []);

  useEffect(() => {
    if (printShopName && phone && address && time) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [printShopName, phone, address, time]);

  // API 호출 함수
  const handleSubmit = async () => {
    if (!isActive || isLoading) return;

    setIsLoading(true);
    setError("");

    // 서버로 보낼 데이터
    const requestData = {
      name: printShopName,
      phone: phone,
      email: email || "",
      business_hours: time,
      address: address,
    };

    // ✅ JSON 로그 찍기
    console.log("서버로 보낼 JSON:", JSON.stringify(requestData, null, 2));

    

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}printshops/create-step1/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("API 응답 상태:", response.status);

      if (!response.ok) {
        throw new Error(`등록 중 오류가 발생했습니다. (${response.status})`);
      }

      const result = await response.json();
      console.log("API 응답 성공:", result);
      localStorage.setItem("printshop_id", String(result.id));
      
      // 성공 시 다음 단계로 이동
      navigate("/printshopRegister2");
    } catch (err) {
      console.error("API 에러:", err);
      setError(err.message || "등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <R.Container>
      {/* 네브바 */}
      <R.Header>
        <R.HeaderMenu>
          <R.CancelButton onClick={() => navigate("/printshopPage")}>
            <R.CancelText>취소하기</R.CancelText>
          </R.CancelButton>
          <R.Title>인쇄소 등록 [1/3]</R.Title>
          <div style={{ width: "89px" }} />
        </R.HeaderMenu>
      </R.Header>

      {/* 입력폼 */}
      <R.FormWrapper>
        <h1>인쇄소에 대한 기본 정보를 알려주세요.</h1>

        {/* 인쇄소 이름 */}
        <R.Section>
          <R.Label>
            인쇄소 이름 <R.Required>*</R.Required>
          </R.Label>
          <R.InputBox>
            <R.Input
              type="text"
              placeholder="인쇄소 이름을 입력해주세요."
              value={printShopName}
              onChange={(e) => setPrintShopName(e.target.value)}
            />
          </R.InputBox>
        </R.Section>

        {/* 연락처 + 이메일 */}
        <R.Row>
          <R.Column>
            <R.Label>
              대표 연락처 <R.Required>*</R.Required>
            </R.Label>
            <R.InputBox>
              <R.Input
                type="text"
                placeholder="010-1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </R.InputBox>
          </R.Column>
          <R.Column>
            <R.Label>이메일(선택)</R.Label>
            <R.InputBox>
              <R.Input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </R.InputBox>
          </R.Column>
        </R.Row>

        {/* 주소 + 영업시간 */}
        <R.Row>
          <R.Column style={{ flex: 1 }}>
            <R.Label>
              주소지 <R.Required>*</R.Required>
            </R.Label>
            <R.InputBox>
              <R.Input
                type="text"
                placeholder="예: 서울시 중구 필동로 1길 30"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </R.InputBox>
            <R.Caption>
              소비자들이 찾아올 수 있도록 정확하게 적어주세요.
            </R.Caption>
          </R.Column>
          <R.Column style={{ width: "172px" }}>
            <R.Label>
              영업 시간 <R.Required>*</R.Required>
            </R.Label>
            <R.InputBox>
              <R.Input
                type="text"
                placeholder="09:00 ~ 18:00"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </R.InputBox>
            <R.Caption>24시간 형식으로 입력해주세요.</R.Caption>
          </R.Column>
        </R.Row>

        {/* 설명 */}
        <R.Section>
          <R.Label>인쇄소 설명(선택)</R.Label>
          <R.InputBox>
            <R.TextArea
              placeholder="500자 이내로 자유롭게 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />
          </R.InputBox>
        </R.Section>

        {/* 에러 메시지 */}
        {error && <R.ErrorMessage>{error}</R.ErrorMessage>}

        {/* 버튼 */}
        <R.Footer>
          <R.NextButton
            $active={isActive && !isLoading}
            onClick={handleSubmit}
            disabled={!isActive || isLoading}
          >
            <R.NextText>{isLoading ? "등록 중..." : "다음"}</R.NextText>
            {!isLoading && <R.NextIcon src={RightRegister} alt="next" />}
          </R.NextButton>
        </R.Footer>
      </R.FormWrapper>
    </R.Container>
  );
};

export default Register1;
