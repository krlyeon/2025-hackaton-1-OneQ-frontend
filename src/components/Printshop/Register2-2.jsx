import React, { useState } from "react";
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
      discountRules.length > 0 // 할인 규칙 추가
    );
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
        <NextButton active={isNextButtonActive()}>
          <NextText>다음</NextText>
          <NextIcon src={rightIcon} alt="next" />
        </NextButton>
      </Footer>
    </Container>
  );
}

export default Register2_2;
