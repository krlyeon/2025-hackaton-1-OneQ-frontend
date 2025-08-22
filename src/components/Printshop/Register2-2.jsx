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
      
      // Prepare the request data with user inputs
      const requestData = {
        equipment_list: [], // This should be managed in your component state if needed
        available_categories: savedOptions,
        description: "", // Add a description input field if needed
        production_time: productionTime,
        delivery_options: deliveryMethods.join(', '),
        bulk_discount: discountRules.join(', ')
      };

      console.log("Sending data to server:", JSON.stringify(requestData, null, 2));
      
      const apiUrl = `/api/printshops/${id}/update-step2/`;
      console.log("API URL:", apiUrl);
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const urlWithTimestamp = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}_t=${timestamp}`;
      
      console.log("Final URL with timestamp:", urlWithTimestamp);
      console.log("Request headers:", {
        'Content-Type': 'application/json',
      });
      
      const response = await fetch(urlWithTimestamp, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
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
        // Show more detailed error message from server if available
        const errorMessage = result.detail || result.message || '서버 요청 중 오류가 발생했습니다.';
        console.error("Server error details:", result);
        throw new Error(errorMessage);
      }

      // 다음 단계로 이동 (3단계)
      if (result.next_step) {
        navigate(`/printshopRegister3/${id}`);
      }
      
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
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
                  <DeliveryRow key={index} style={{marginBottom: '8px', width: '840px' }}>
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
              {/* 하단 버튼 */}
      <Footer>
        <NextButton 
          active={isNextButtonActive()} 
          onClick={handleNext}
          disabled={!isNextButtonActive()}
        >
          <NextText>{isSubmitting ? '저장 중...' : '다음'}</NextText>
          {!isSubmitting && <NextIcon src={rightIcon} alt="next" />}
        </NextButton>
      </Footer>
      </Content>
    </Container>
  );
}

export default Register2_2;