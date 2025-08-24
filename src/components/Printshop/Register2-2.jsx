import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal7 from "../Common/Modal7";
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
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { 
    savedOptions, 
    productionTime, 
    setProductionTime,
    deliveryMethods,
    setDeliveryMethods,
    discountRules,
    setDiscountRules,
    isLoading,
    setPrintshopId
  } = usePrintshop();
  
  const [deliveryInput, setDeliveryInput] = useState('');
  const [discountInput, setDiscountInput] = useState('');
  
  // Set printshop ID when component mounts or ID changes
  useEffect(() => {
    if (id) {
      setPrintshopId(id);
    }
  }, [id, setPrintshopId]);
  
  // 데이터 로드 상태 확인 및 초기화
  useEffect(() => {
    console.log('[Register2-2] Context state:', {
      productionTime,
      deliveryMethods,
      discountRules,
      savedOptions,
      isLoading
    });
    
    // Initialize delivery methods and discount rules from savedOptions if they exist
    if (savedOptions.delivery_options) {
      const deliveryOptions = Array.isArray(savedOptions.delivery_options) 
        ? savedOptions.delivery_options 
        : [savedOptions.delivery_options].filter(Boolean);
      setDeliveryMethods(deliveryOptions);
    }
    
    if (savedOptions.bulk_discount) {
      const discountOptions = Array.isArray(savedOptions.bulk_discount)
        ? savedOptions.bulk_discount
        : [savedOptions.bulk_discount].filter(Boolean);
      setDiscountRules(discountOptions);
    }
    
    if (savedOptions.production_time) {
      setProductionTime(savedOptions.production_time);
    }
  }, [savedOptions, isLoading]);
  
  // 로딩 중이거나 데이터가 아직 로드되지 않았을 때
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const addDeliveryMethod = () => {
    if (!deliveryInput.trim()) {
      alert('배송 방법을 입력해주세요.');
      return;
    }
    
    setDeliveryMethods(prev => [...prev, deliveryInput.trim()]);
    setDeliveryInput('');
  };
  
  const removeDeliveryMethod = (index) => {
    setDeliveryMethods(prev => prev.filter((_, i) => i !== index));
  };
  
  const addDiscountRule = () => {
    if (!discountInput.trim()) {
      alert('할인 규칙을 입력해주세요.');
      return;
    }
    
    setDiscountRules(prev => [...prev, discountInput.trim()]);
    setDiscountInput('');
  };
  
  const removeDiscountRule = (index) => {
    setDiscountRules(prev => prev.filter((_, i) => i !== index));
  };
  
  // NextButton 활성화 조건 확인
  const isNextButtonActive = () => {
    // 필수 필드만 확인
    const hasRequiredFields = (
      productionTime?.trim() &&
      deliveryMethods?.length > 0 &&
      discountRules?.length > 0 &&
      !isSubmitting
    );
    
    console.log('[Register2-2] isNextButtonActive:', {
      hasProductionTime: !!productionTime?.trim(),
      hasDeliveryMethods: deliveryMethods?.length > 0,
      hasDiscountRules: discountRules?.length > 0,
      isNotSubmitting: !isSubmitting,
      result: hasRequiredFields
    });
    
    return hasRequiredFields;
  };

  const submitForm = async () => {
    if (!isNextButtonActive()) return;

    try {
      setIsSubmitting(true);
      
      // Check registration status before proceeding
      const statusRes = await fetch(
        `${import.meta.env.VITE_API_BASE}printshops/${id}/registration-status/`
      );
      const statusJson = await statusRes.json();
      
      // Handle different registration statuses
      const currentStatus = statusJson?.status;
      if (currentStatus === 'completed') {
        // If already completed, just navigate to the next step
        navigate(`/printshopRegister3/${id}`);
        return;
      } else if (!['step1', 'step2'].includes(currentStatus)) {
        throw new Error(`등록 상태를 확인할 수 없습니다. (현재 상태: ${currentStatus})`);
      }
      
      // Get available categories from saved options
      const availableCategories = savedOptions.available_categories || savedOptions.localSavedOptions || [];
      
      if (!productionTime?.trim()) {
        throw new Error('제작 기간을 입력해주세요.');
      }
      
      if (deliveryMethods.length === 0) {
        throw new Error('하나 이상의 배송 방법을 추가해주세요.');
      }
      
      if (discountRules.length === 0) {
        throw new Error('하나 이상의 할인 규칙을 추가해주세요.');
      }

      // Prepare the request data with all required fields
      const requestData = {
        production_time: productionTime,
        delivery_options: deliveryMethods,
        bulk_discount: discountRules,
        available_categories: availableCategories // Include available categories in the request
      };

      console.log("Sending data to server:", JSON.stringify(requestData, null, 2));
      
      const apiUrl = `${import.meta.env.VITE_API_BASE}printshops/${id}/update-step2/`;
      console.log("API URL:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: isEditMode ? 'PATCH' : 'PUT',
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
        // Handle step 1 not completed case
        if (result.error && result.error.includes('1단계')) {
          alert('1단계 등록을 먼저 완료해주세요.');
          navigate(`/printshopRegister?edit=true&id=${id}`);
          return false;
        }
        
        // Show more detailed error message from server if available
        const errorMessage = result.detail || result.message || '서버 요청 중 오류가 발생했습니다.';
        console.error("Server error details:", result);
        throw new Error(errorMessage);
      }

      return true;
      
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (!isNextButtonActive()) return;
    console.log('handleNext called, isEditMode:', isEditMode);

    if (isEditMode) {
      // 수정 모드일 경우 모달 표시
      console.log('Showing save modal');
      setShowSaveModal(true);
    } else {
      // 일반 모드일 경우 바로 제출
      try {
        await submitForm();
        navigate(`/printshopRegister3/${id}`);
      } catch (error) {
        // 에러는 이미 submitForm에서 처리됨
      }
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
                  <DeliveryRow key={index} style={{marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <DeliveryInput 
                      value={method} 
                      readOnly 
                      style={{ flex: 1 }}
                    />
                    <button 
                      onClick={() => removeDeliveryMethod(index)}
                      style={{
                        background: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      삭제
                    </button>
                  </DeliveryRow>
                ))}
                <DeliveryInput 
                  placeholder="예: 택배(+3000원)" 
                  value={deliveryInput}
                  onChange={(e) => setDeliveryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDeliveryMethod()}
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
                  <DeliveryRow key={index} style={{marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <DeliveryInput 
                      value={rule}
                      readOnly
                      style={{ flex: 1 }}
                    />
                    <button 
                      onClick={() => removeDiscountRule(index)}
                      style={{
                        background: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      삭제
                    </button>
                  </DeliveryRow>
                ))}
                <DeliveryInput 
                  placeholder="예: 100장 이상 주문 시 장당 500원" 
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDiscountRule()}
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
          disabled={!isNextButtonActive() || isSubmitting}
        >
          <NextText>
            {isSubmitting ? '저장 중...' : isEditMode ? '수정' : '다음'}
          </NextText>
          {!isSubmitting && <NextIcon src={rightIcon} alt="next" />}
        </NextButton>
      </Footer>

      {showSaveModal && (
        <Modal7
          onClose={() => setShowSaveModal(false)}
          onConfirm={async () => {
            console.log('Modal7 onConfirm called, isEditMode:', isEditMode);
            try {
              const success = await submitForm();
              console.log('Form submitted successfully, navigating...');
              console.log('isEditMode during navigation:', isEditMode);
              console.log('Target path:', isEditMode ? '/printshopPage' : `/printshopRegister3/${id}`);
              navigate(isEditMode ? '/printshopPage' : `/printshopRegister3/${id}`);
            } catch (error) {
              console.error('Error in form submission:', error);
              // 에러는 이미 submitForm에서 처리됨
            } finally {
              setShowSaveModal(false);
            }
          }}
          onCancel={() => setShowSaveModal(false)}
        />
      )}
      </Content>
    </Container>
  );
}

export default Register2_2;