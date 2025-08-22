import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Content,
  Section,
  SectionTitle,
  InputGroup,
  InputBox,
  Input,
  InputDescription,
  DeliveryHeader,
  DeliveryDescription,
  DeliveryBox,
  DeliveryList,
  DeliveryInputWrapper,
  DeliveryInput,
  DeliveryFooter,
  AddMore,
  AddIcon,
  AddText,
  Footer,
  BackButton,
  BackIcon,
  BackText,
  NextButton,
  NextText,
  NextIcon,
  DeliveryRow,
} from "./Register2-2.styles";
import { usePrintshop } from "../../contexts/PrintshopContext";

import plusIcon from "../../assets/Printshop/plus.png";
import leftIcon from "../../assets/Printshop/left-register.png";
import rightIcon from "../../assets/Printshop/right-register.png";

function Register2_2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    savedOptions, 
    productionTime, 
    setProductionTime,
    deliveryMethods,
    setDeliveryMethods,
    discountRules,
    setDiscountRules
  } = usePrintshop();
  
  const [deliveryInput, setDeliveryInput] = useState('');
  const [discountInput, setDiscountInput] = useState('');
  
  const addDeliveryMethod = () => {
    if (!deliveryInput.trim()) {
      alert('배송 방법을 입력해주세요.');
      return;
    }
    
    setDeliveryMethods(prev => [...prev, deliveryInput.trim()]);
    setDeliveryInput('');
  };
  
  const addDiscountRule = () => {
    if (!discountInput.trim()) {
      alert('할인 규칙을 입력해주세요.');
      return;
    }
    
    setDiscountRules(prev => [...prev, discountInput.trim()]);
    setDiscountInput('');
  };
  
  // NextButton 활성화 조건 확인
  const isNextButtonActive = () => {
    return (
      savedOptions.length > 0 && // Register2에서 최소 1번 저장
      productionTime.trim() && // 제작 소요 시간 입력
      deliveryMethods.length > 0 && // 배송 방법 추가
      discountRules.length > 0 && // 할인 규칙 추가
      !isSubmitting
    );
  };

  const handleNext = async () => {
    if (!isNextButtonActive()) return;

    try {
      setIsSubmitting(true);
      
      // Prepare the request data according to API spec
      const requestData = {
        available_categories: savedOptions,
        description: "고품질 인쇄 서비스를 제공합니다.",
        production_time: productionTime,
        delivery_options: deliveryMethods.join(', '),
        bulk_discount: discountRules.join(', ')
      };

      console.log("Sending data to server:", JSON.stringify(requestData, null, 2));
      
      const apiUrl = `${import.meta.env.VITE_API_BASE}printshops/${id}/update-step2/`;
      const token = localStorage.getItem('token'); // Get auth token if exists
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(requestData),
        credentials: 'include', // Include cookies if using session-based auth
      });

      let result;
      try {
        result = await response.json();
        console.log("Server response:", result);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error('서버 응답을 처리하는 중 오류가 발생했습니다.');
      }

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(result.error || '잘못된 요청입니다. 입력값을 확인해주세요.');
        } else if (response.status === 401) {
          // Handle token expiration or invalid token
          localStorage.removeItem('token');
          throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
        } else if (response.status === 403) {
          throw new Error('접근 권한이 없습니다.');
        } else if (response.status === 404) {
          throw new Error('인쇄소를 찾을 수 없습니다.');
        } else {
          throw new Error(result.error || result.message || '서버 요청 중 오류가 발생했습니다.');
        }
      }

      // 다음 단계로 이동 (3단계)
      if (result.next_step) {
        // Show success message before navigating
        alert('성공적으로 저장되었습니다! 다음 단계로 이동합니다.');
        navigate(`/printshopRegister3/${id}`);
      }
      
    } catch (error) {
      console.error('Error saving data:', error);
      // Show more specific error messages based on error type
      if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
      } else {
        alert(`저장 중 오류가 발생했습니다: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Container>
      <Content>
        {/* 평균 제작 소요 시간 */}
        <Section>
          <SectionTitle>평균 제작 소요 시간</SectionTitle>
          <InputGroup>
            <InputBox>
              <Input 
                placeholder="예: 24시간" 
                value={productionTime}
                onChange={(e) => setProductionTime(e.target.value)}
              />
            </InputBox>
            <InputDescription>
              인쇄 견적을 받고 제작까지 소요되는 평균 시간을 적어주세요.
            </InputDescription>
          </InputGroup>
        </Section>

        {/* 배송 방법 */}
        <Section>
          <DeliveryHeader>
            <SectionTitle>배송 방법</SectionTitle>
            <DeliveryDescription>
              배송 방법과 비용을 함께 입력해주세요.
            </DeliveryDescription>
          </DeliveryHeader>

          <DeliveryBox>
            <DeliveryList>
              <DeliveryInputWrapper>
                {deliveryMethods.map((method, index) => (
                  <DeliveryRow key={index} style={{marginBottom: '8px'}}>
                    <DeliveryInput value={method} />
                  </DeliveryRow>
                ))}
                <DeliveryInput 
                  placeholder="예: 택배(+3000원)" 
                  value={deliveryInput}
                  onChange={(e) => setDeliveryInput(e.target.value)}
                />
              </DeliveryInputWrapper>
            </DeliveryList>
            <DeliveryFooter>
              <AddMore onClick={addDeliveryMethod}>
                <AddIcon src={plusIcon} alt="plus" />
                <AddText>눌러서 추가하기</AddText>
              </AddMore>
            </DeliveryFooter>
          </DeliveryBox>
        </Section>

        {/* 주문 수량 별 할인 */}
        <Section>
          <DeliveryHeader>
            <SectionTitle>주문 수량 별 할인</SectionTitle>
            <DeliveryDescription>
              주문 수량에 따른 가격 변동을 입력해주세요.
            </DeliveryDescription>
          </DeliveryHeader>

          <DeliveryBox>
            <DeliveryList>
              <DeliveryInputWrapper>
                {discountRules.map((rule, index) => (
                  <DeliveryRow key={index} style={{marginBottom: '8px'}}>
                    <DeliveryInput value={rule} />
                  </DeliveryRow>
                ))}
                <DeliveryInput 
                  placeholder="예: 100장 이상 주문 시 장당 500원" 
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                />
              </DeliveryInputWrapper>
            </DeliveryList>
            <DeliveryFooter>
              <AddMore onClick={addDiscountRule}>
                <AddIcon src={plusIcon} alt="plus" />
                <AddText>눌러서 추가하기</AddText>
              </AddMore>
            </DeliveryFooter>
          </DeliveryBox>
        </Section>
      </Content>

      {/* 하단 버튼 */}
      <Footer>
        <BackButton>
          <BackIcon src={leftIcon} alt="back" />
          <BackText>뒤로</BackText>
        </BackButton>
        <NextButton 
          active={isNextButtonActive()} 
          onClick={handleNext}
          disabled={!isNextButtonActive()}
        >
          <NextText>{isSubmitting ? '저장 중...' : '다음'}</NextText>
          {!isSubmitting && <NextIcon src={rightIcon} alt="next" />}
        </NextButton>
      </Footer>
    </Container>
  );
}

export default Register2_2;