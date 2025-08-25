import React, { useState, useEffect } from "react";
import * as R from "./Register1.styles";
import RightRegister from "../../assets/Printshop/right-register.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal3 from "../Common/Modal3";
import Modal4 from "../Common/Modal4";
import Modal7 from "../Common/Modal7";

const Register1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const printshopId = searchParams.get('id');

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
  
  // 모달 표시 상태
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

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

  // 기존 데이터 로드
  useEffect(() => {
    const fetchPrintshopData = async () => {
      if (!isEditMode || !printshopId) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}printshops/${printshopId}/`);
        if (!response.ok) throw new Error('Failed to fetch printshop data');
        
        const data = await response.json();
        setPrintShopName(data.name || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setTime(data.business_hours || '');
        setEmail(data.email || '');
        setDescription(data.description || '');
      } catch (error) {
        console.error('Error fetching printshop data:', error);
        alert('인쇄소 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchPrintshopData();
  }, [isEditMode, printshopId]);

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
      description: description || ""
    };

    console.log("1. Step 1 - 서버로 보낼 데이터:", JSON.stringify(requestData, null, 2));
    
    try {
      const apiUrl = isEditMode 
        ? `${import.meta.env.VITE_API_BASE}printshops/${printshopId}/update/`  // Use update endpoint for edits
        : `${import.meta.env.VITE_API_BASE}printshops/create-step1/`;
        
      console.log("2. Step 1 - API Request:", {
        url: apiUrl,
        method: isEditMode ? "PATCH" : "POST",
        body: requestData,
        isEditMode,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const response = await fetch(apiUrl, {
        method: isEditMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      let result;
      try {
        result = await response.json();
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        result = {};
      }

      console.log("3. Step 1 - API Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: result
      });

      if (!response.ok) {
        const errorMessage = result.detail || result.message || 
          `등록 중 오류가 발생했습니다. (${response.status} ${response.statusText})`;
        console.error("Step 1 - API 오류:", errorMessage);
        throw new Error(errorMessage);
      }

      // Handle response for both edit and create modes
      let id;
      if (isEditMode) {
        id = printshopId;
      } else {
        // For create mode, try to get ID from different possible response formats
        id = result?.id || result?.data?.id || null;
        if (!id) {
          console.error("Step 1 - 서버 응답에서 ID를 찾을 수 없습니다:", result);
          throw new Error("서버 응답에서 인쇄소 ID를 가져오지 못했습니다.");
        }
        id = String(id);
        
        // Store in localStorage for new registrations
        localStorage.setItem("printshop_id", id);
      }

      console.log("5. Step 1 - 처리된 printshop_id:", id);
      console.log("6. Step 1 - 응답 데이터:", result);
      
      // Set next step URL
      const nextStepUrl = `/printshopRegister2/${id}${isEditMode ? '?edit=true' : ''}`;
      console.log("7. Step 1 - 다음 단계 URL이 설정되었습니다.", {
        id,
        isEditMode,
        nextUrl: nextStepUrl,
        response: result
      });
      
      // 수정 모드에서도 바로 이동하도록 수정
      window.location.href = nextStepUrl;
    } catch (err) {
      console.error("API 에러:", err);
      const errorMessage = err.response?.data?.message || err.message || "등록 중 오류가 발생했습니다.";
      setError(errorMessage);
      alert(`저장에 실패했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showCancelModal && (
        isEditMode ? (
          <Modal4 
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => navigate("/printshopPage")}
          />
        ) : (
          <Modal3 
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => navigate("/printshopPage")}
          />
        )
      )}
      
      {showSaveModal && (
        <Modal7
          onClose={() => setShowSaveModal(false)}
          onConfirm={() => window.location.href = nextUrl}
        />
      )}
      <R.Container>
        {/* 네브바 */}
        <R.Header>
          <R.HeaderMenu>
            <R.CancelButton onClick={() => setShowCancelModal(true)}>
              <R.CancelText>취소하기</R.CancelText>
            </R.CancelButton>
          <R.Title>{isEditMode ? '인쇄소 수정 [1/2]' : '인쇄소 등록 [1/3]'}</R.Title>
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
            disabled={!isActive}
          >
            {isLoading ? "등록 중..." : '다음'}
            {!isLoading && <R.NextIcon src={RightRegister} alt="next" />}
          </R.NextButton>
        </R.Footer>
      </R.FormWrapper>
    </R.Container>
    </>
  );
};

export default Register1;
