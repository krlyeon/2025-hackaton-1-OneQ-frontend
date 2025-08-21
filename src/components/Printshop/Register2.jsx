import React, { useState } from 'react';
import * as E from './Register2.styles';
import { usePrintshop } from '../../contexts/PrintshopContext';
import card from "../../assets/Printshop/card.png";
import banner from "../../assets/Printshop/banner.png";
import poster from "../../assets/Printshop/poster.png";
import sticker from "../../assets/Printshop/sticker.png";
import banner2 from "../../assets/Printshop/banner2.png";
import brochure from "../../assets/Printshop/brochure.png";
import plus from "../../assets/Printshop/plus.png";
import line from "../../assets/Printshop/line.png";

const Register2 = () => {
  const { setSavedOptions } = usePrintshop();
  const [selectedOption, setSelectedOption] = useState('card');
  const [localSavedOptions, setLocalSavedOptions] = useState([]);
  const [sectionData, setSectionData] = useState({});
  const [minOrderQuantity, setMinOrderQuantity] = useState('');
  const [inputValues, setInputValues] = useState({});

  const cardOptions = [
    { id: 'card', name: '명함', image: card },
    { id: 'banner', name: '배너', image: banner },
    { id: 'poster', name: '포스터', image: poster },
    { id: 'sticker', name: '스티커', image: sticker },
    { id: 'banner2', name: '현수막', image: banner2 },
    { id: 'brochure', name: '브로셔', image: brochure }
  ];

  const getCardContent = (optionId) => {
    switch (optionId) {
      case 'card':
        return {
          type: 'three',
          section1: {
            title: '용지 종류',
            caption: '용지 옵션 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 아트지(+3000원)',
            placeholder2: '가장 대중적으로 사용되는 인쇄용지'
          },
          section2: {
            title: '인쇄 방식',
            caption: '인쇄 방식 및 가격, 크기를 적어주세요.',
            placeholder1: '예: 양면 인쇄(+1000원)',
            placeholder2: '레이저 프린터를 사용한 양면인쇄'
          },
          section3: {
            title: '후가공 종류',
            caption: '후가공 옵션명 및 가격, 설명을 적어주세요',
            placeholder1: '예: 에폭시(+4000원)',
            placeholder2: '인쇄물 표면에 돌출된 부분을 추가하는 옵션'
          }
        };
      case 'banner':
        return {
          type: 'two',
          section1: {
            title: '사이즈 종류',
            caption: '사이즈명 및 가격, 크기를 적어주세요.',
            placeholder1: '예: A4(+0원)',
            placeholder2: '210mm x 297mm'
          },
          section2: {
            title: '거치대 종류',
            caption: '거치대명 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 일반형 거치대(+3000원)',
            placeholder2: '무게가 가벼워 설치 및 이동이 용이합니다.'
          }
        };
      case 'poster':
        return {
          type: 'two',
          section1: {
            title: '용지 종류',
            caption: '용지 옵션 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 아트지(+3000원)',
            placeholder2: '가장 대중적으로 사용되는 인쇄용지'
          },
          section2: {
            title: '코팅 종류',
            caption: '코팅 옵션명 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 유광 코팅(+3000원)',
            placeholder2: '유광 처리를 통해 디자인 질감을 살립니다.'
          }
        };
      case 'sticker':
        return {
          type: 'two',
          section1: {
            title: '스티커 종류',
            caption: '스티커 옵션 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 싱글 스티커(개당 9원)',
            placeholder2: '대지 모양에 맞춰 한장씩 잘라지는 스티커'
          },
          section2: {
            title: '사이즈 종류',
            caption: '사이즈명 및 가격, 크기를 적어주세요.',
            placeholder1: '예: 포토카드(+3000원)',
            placeholder2: '54x86mm'
          }
        };
      case 'banner2':
        return {
          type: 'two',
          section1: {
            title: '사이즈 종류',
            caption: '사이즈명 및 가격, 크기를 적어주세요.',
            placeholder1: '예: 가로형 표준형(+3000원)',
            placeholder2: '500cm x 90cm'
          },
          section2: {
            title: '추가가공 종류',
            caption: '추가가공 옵션명 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 각목막대+끈(+2000원)',
            placeholder2: '각목막대와 끈을 묶어 후가공합니다.'
          }
        };
      case 'brochure':
        return {
          type: 'three',
          section1: {
            title: '용지 종류',
            caption: '용지 옵션 및 가격, 크기를 적어주세요.',
            placeholder1: '예: 아트지(+3000원)',
            placeholder2: '가장 대중적으로 사용되는 인쇄용지'
          },
          section2: {
            title: '사이즈 종류',
            caption: '사이즈명 및 가격, 크기를 적어주세요.',
            placeholder1: '예: A4(+0원)',
            placeholder2: '210mm x 297mm'
          },
          section3: {
            title: '접지 종류',
            caption: '접지 옵션명 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 3단 접지(+4000원)',
            placeholder2: '3번 접은 방식의 브로셔'
          }
        };
      default:
        return {
          type: 'two',
          section1: {
            title: '사이즈 종류',
            caption: '사이즈명 및 가격, 크기를 적어주세요.',
            placeholder1: '예: A4(+0원)',
            placeholder2: '210mm x 297mm'
          },
          section2: {
            title: '거치대 종류',
            caption: '거치대명 및 가격, 설명을 적어주세요.',
            placeholder1: '예: 일반형 거치대(+3000원)',
            placeholder2: '무게가 가벼워 설치 및 이동이 용이합니다.'
          }
        };
    }
  };

  const handleCardClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const addInputRow = (sectionKey) => {
    const input1Key = `${selectedOption}_${sectionKey}_input1`;
    const input2Key = `${selectedOption}_${sectionKey}_input2`;
    const input1 = inputValues[input1Key] || '';
    const input2 = inputValues[input2Key] || '';
    
    if (!input1.trim() || !input2.trim()) {
      alert('모든 입력창을 채워주세요.');
      return;
    }
    
    setSectionData(prev => ({
      ...prev,
      [selectedOption]: {
        ...prev[selectedOption],
        [sectionKey]: [
          ...(prev[selectedOption]?.[sectionKey] || []),
          { input1: input1.trim(), input2: input2.trim() }
        ]
      }
    }));
    
    // 입력창 초기화
    setInputValues(prev => ({
      ...prev,
      [input1Key]: '',
      [input2Key]: ''
    }));
  };

  const updateInputValue = (key, value) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderSavedRows = (sectionKey) => {
    const savedRows = sectionData[selectedOption]?.[sectionKey] || [];
    return savedRows.map((row, index) => (
      <E.InputRow key={index} style={{marginBottom: '8px'}}>
        <E.InputText value={row.input1} readOnly style={{backgroundColor: '#f9f9f9'}} />
        <img src={line} alt="line" />
        <E.InputText value={row.input2} readOnly style={{backgroundColor: '#f9f9f9'}} />
      </E.InputRow>
    ));
  };

  const handleSave = () => {
    const content = getCardContent(selectedOption);
    const currentData = sectionData[selectedOption] || {};
    
    // 모든 섹션에 데이터가 있는지 확인
    const requiredSections = content.type === 'three' ? ['section1', 'section2', 'section3'] : ['section1', 'section2'];
    const hasAllSections = requiredSections.every(section => 
      currentData[section] && currentData[section].length > 0
    );
    
    if (hasAllSections && minOrderQuantity.trim()) {
      const newSavedOptions = localSavedOptions.includes(selectedOption) 
        ? localSavedOptions 
        : [...localSavedOptions, selectedOption];
      
      setLocalSavedOptions(newSavedOptions);
      setSavedOptions(newSavedOptions); // Context에도 업데이트
      alert('저장되었습니다!');
    } else {
      alert('모든 섹션에 데이터를 추가하고 최소 주문 수량을 입력해주세요.');
    }
  };

  return (
    <E.Container>
      {/* 상단 메뉴 */}
      <E.Menu>
        <E.MenuInner>
          <E.TopBar>
            <E.CancelBtn>취소하기</E.CancelBtn>
            <E.Title>인쇄소 등록 [2/3]</E.Title>
            <E.StepBox>
            </E.StepBox>
          </E.TopBar>
        </E.MenuInner>
      </E.Menu>

      {/* 메인 */}
      <E.MainWrapper>
        {/* 헤더 */}
        <E.SectionTitle>
          인쇄물 정보 등록
        </E.SectionTitle>

        <E.Content>
          {/* 설명 */}
          <E.DescriptionBox>
            <E.TextGroup>
              <E.SubTitle>
                카드를 눌러 인쇄물에 대한 정보를 자유롭게 추가해주세요.
              </E.SubTitle>
              <E.Caption>
                최소 1개 이상의 인쇄물에 대한 정보를 입력해주셔야 합니다.
              </E.Caption>
            </E.TextGroup>

            <E.CardSelect>
              {cardOptions.map(option => (
                <E.CardOption 
                  key={option.id}
                  selected={selectedOption === option.id}
                  saved={localSavedOptions.includes(option.id)}
                  onClick={() => handleCardClick(option.id)}
                >
                  <img src={option.image} alt={option.name} />
                  <span>{option.name}</span>
                </E.CardOption>
              ))}
            </E.CardSelect>
          </E.DescriptionBox>

          {/* 입력 카드 */}
          <E.InputCard>
            {(() => {
              const content = getCardContent(selectedOption);
              
              if (content.type === 'three') {
                return (
                  <E.ThreeCardContentWrapper>
                    {/* 첫 번째 섹션 */}
                    <E.ThreeSection>
                      <E.ThreeDeliveryHeader>
                        <E.ThreeSectionTitle>{content.section1.title}</E.ThreeSectionTitle>
                        <E.ThreeInputDescription>{content.section1.caption}</E.ThreeInputDescription>
                      </E.ThreeDeliveryHeader>
                      
                      <E.ThreeDeliveryBox>
                        <E.ThreeDeliveryList>
                          <E.ThreeDeliveryInputWrapper>
                            {renderSavedRows('section1')}
                            <E.InputRow>
                              <E.InputText 
                                placeholder={content.section1.placeholder1} 
                                value={inputValues[`${selectedOption}_section1_input1`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section1_input1`, e.target.value)}
                              />
                              <img src={line} alt="line" />
                              <E.InputText 
                                placeholder={content.section1.placeholder2} 
                                value={inputValues[`${selectedOption}_section1_input2`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section1_input2`, e.target.value)}
                              />
                            </E.InputRow>
                          </E.ThreeDeliveryInputWrapper>
                        </E.ThreeDeliveryList>
                        <E.ThreeDeliveryFooter>
                          <E.ThreeAddMore onClick={() => addInputRow('section1')}>
                            <img src={plus} alt="plus" style={{width: '28px', height: '28px'}} />
                            <span style={{color: 'var(--Neutral-300, #bfbfbf)', fontSize: '18px'}}>눌러서 추가하기</span>
                          </E.ThreeAddMore>
                        </E.ThreeDeliveryFooter>
                      </E.ThreeDeliveryBox>
                    </E.ThreeSection>

                    {/* 두 번째 섹션 */}
                    <E.ThreeSection>
                      <E.ThreeDeliveryHeader>
                        <E.ThreeSectionTitle>{content.section2.title}</E.ThreeSectionTitle>
                        <E.ThreeInputDescription>{content.section2.caption}</E.ThreeInputDescription>
                      </E.ThreeDeliveryHeader>
                      
                      <E.ThreeDeliveryBox>
                        <E.ThreeDeliveryList>
                          <E.ThreeDeliveryInputWrapper>
                            {renderSavedRows('section2')}
                            <E.InputRow>
                              <E.InputText 
                                placeholder={content.section2.placeholder1} 
                                value={inputValues[`${selectedOption}_section2_input1`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section2_input1`, e.target.value)}
                              />
                              <img src={line} alt="line" />
                              <E.InputText 
                                placeholder={content.section2.placeholder2} 
                                value={inputValues[`${selectedOption}_section2_input2`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section2_input2`, e.target.value)}
                              />
                            </E.InputRow>
                          </E.ThreeDeliveryInputWrapper>
                        </E.ThreeDeliveryList>
                        <E.ThreeDeliveryFooter>
                          <E.ThreeAddMore onClick={() => addInputRow('section2')}>
                            <img src={plus} alt="plus" style={{width: '28px', height: '28px'}} />
                            <span style={{color: 'var(--Neutral-300, #bfbfbf)', fontSize: '18px'}}>눌러서 추가하기</span>
                          </E.ThreeAddMore>
                        </E.ThreeDeliveryFooter>
                      </E.ThreeDeliveryBox>
                    </E.ThreeSection>

                    {/* 세 번째 섹션 */}
                    <E.ThreeSection>
                      <E.ThreeDeliveryHeader>
                        <E.ThreeSectionTitle>{content.section3.title}</E.ThreeSectionTitle>
                        <E.ThreeInputDescription>{content.section3.caption}</E.ThreeInputDescription>
                      </E.ThreeDeliveryHeader>
                      
                      <E.ThreeDeliveryBox>
                        <E.ThreeDeliveryList>
                          <E.ThreeDeliveryInputWrapper>
                            {renderSavedRows('section3')}
                            <E.InputRow>
                              <E.InputText 
                                placeholder={content.section3.placeholder1} 
                                value={inputValues[`${selectedOption}_section3_input1`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section3_input1`, e.target.value)}
                              />
                              <img src={line} alt="line" />
                              <E.InputText 
                                placeholder={content.section3.placeholder2} 
                                value={inputValues[`${selectedOption}_section3_input2`] || ''}
                                onChange={(e) => updateInputValue(`${selectedOption}_section3_input2`, e.target.value)}
                              />
                            </E.InputRow>
                          </E.ThreeDeliveryInputWrapper>
                        </E.ThreeDeliveryList>
                        <E.ThreeDeliveryFooter>
                          <E.ThreeAddMore onClick={() => addInputRow('section3')}>
                            <img src={plus} alt="plus" style={{width: '28px', height: '28px'}} />
                            <span style={{color: 'var(--Neutral-300, #bfbfbf)', fontSize: '18px'}}>눌러서 추가하기</span>
                          </E.ThreeAddMore>
                        </E.ThreeDeliveryFooter>
                      </E.ThreeDeliveryBox>
                    </E.ThreeSection>
                  </E.ThreeCardContentWrapper>
                );
              } else {
                return (
                  <E.CardContent>
                    {/* 첫 번째 섹션 */}
                    <E.FormSection>
                      <E.FormLabel>
                        {content.section1.title}
                        <E.Caption>{content.section1.caption}</E.Caption>
                      </E.FormLabel>

                      <E.InputBox>
                        <E.InputList>
                          {renderSavedRows('section1')}
                          <E.InputRow>
                            <E.InputText 
                              placeholder={content.section1.placeholder1} 
                              value={inputValues[`${selectedOption}_section1_input1`] || ''}
                              onChange={(e) => updateInputValue(`${selectedOption}_section1_input1`, e.target.value)}
                            />
                            <img src={line} alt="line" />
                            <E.InputText 
                              placeholder={content.section1.placeholder2} 
                              value={inputValues[`${selectedOption}_section1_input2`] || ''}
                              onChange={(e) => updateInputValue(`${selectedOption}_section1_input2`, e.target.value)}
                            />
                          </E.InputRow>
                        </E.InputList>

                        <E.AddRow onClick={() => addInputRow('section1')}>
                          <img src={plus} alt="plus" />
                          <span>눌러서 추가하기</span>
                        </E.AddRow>
                      </E.InputBox>
                    </E.FormSection>

                    {/* 두 번째 섹션 */}
                    <E.FormSection>
                      <E.FormLabel>
                        {content.section2.title}
                        <E.Caption>{content.section2.caption}</E.Caption>
                      </E.FormLabel>

                      <E.InputBox>
                        <E.InputList>
                          {renderSavedRows('section2')}
                          <E.InputRow>
                            <E.InputText 
                              placeholder={content.section2.placeholder1} 
                              value={inputValues[`${selectedOption}_section2_input1`] || ''}
                              onChange={(e) => updateInputValue(`${selectedOption}_section2_input1`, e.target.value)}
                            />
                            <img src={line} alt="line" />
                            <E.InputText 
                              placeholder={content.section2.placeholder2} 
                              value={inputValues[`${selectedOption}_section2_input2`] || ''}
                              onChange={(e) => updateInputValue(`${selectedOption}_section2_input2`, e.target.value)}
                            />
                          </E.InputRow>
                        </E.InputList>

                        <E.AddRow onClick={() => addInputRow('section2')}>
                          <img src={plus} alt="plus" />
                          <span>눌러서 추가하기</span>
                        </E.AddRow>
                      </E.InputBox>
                    </E.FormSection>
                  </E.CardContent>
                );
              }
            })()}

            {/* 최소 주문 수량 & 버튼 */}
            <E.Footer>
              <E.MinOrder>
                <E.FormLabel>최소 주문 수량</E.FormLabel>
                <E.MinOrderInput 
                placeholder="예: 1개" 
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(e.target.value)}
              />
              </E.MinOrder>

              <E.SubmitBtn onClick={handleSave}>저장하기</E.SubmitBtn>
            </E.Footer>
          </E.InputCard>
        </E.Content>
      </E.MainWrapper>
    </E.Container>
  );
};

export default Register2;
