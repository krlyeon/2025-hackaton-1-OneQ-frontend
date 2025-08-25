import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import * as E from './Register2.styles';
import Modal3 from "../Common/Modal3";
import Modal4 from "../Common/Modal4";
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
  const navigate = useNavigate();
  const { setSavedOptions } = usePrintshop();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
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

  // Transform API data to UI format
  const transformApiDataToUi = (apiData) => {
    if (!apiData) return [];
    
    // If it's already in UI format, return as is
    if (Array.isArray(apiData)) return apiData;
    
    // If it's an object with quantity: price mapping
    if (typeof apiData === 'object' && apiData !== null) {
      return Object.entries(apiData).map(([qty, price], idx) => ({
        input1: `${qty}`, 
        input2: `${price}`
      }));
    }
    
    // If it's a string in format "item1, description1, item2, description2, ..."
    if (typeof apiData === 'string' && apiData.includes(',')) {
      const parts = apiData.split(',').map(part => part.trim());
      const result = [];
      
      // Process pairs of items (name, description)
      for (let i = 0; i < parts.length; i += 2) {
        if (parts[i]) {
          result.push({
            input1: parts[i],
            input2: parts[i + 1] || '' // Handle case where there's no matching description
          });
        }
      }
      
      if (result.length > 0) return result;
    }
    
    // If it's a simple string, put it in input1
    if (typeof apiData === 'string') {
      return [{
        input1: apiData,
        input2: ''
      }];
    }
    
    // If it's a string that might be JSON, try to parse it
    try {
      const parsed = JSON.parse(apiData);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === 'object') {
        return Object.entries(parsed).map(([qty, price]) => ({
          input1: `${qty}`, 
          input2: `${price}`
        }));
      }
    } catch (e) {
      // If parsing fails, return as single item
      return [{
        input1: String(apiData),
        input2: ''
      }];
    }
    
    // Default case - return empty array
    return [];
  };

  // Transform UI data to API format
  const transformUiDataToApi = (uiData) => {
    if (!uiData || !uiData.length) return '';
    
    // Convert array of {input1: qty, input2: price} to a comma-separated string
    return uiData
      .filter(row => row.input1 && row.input2)
      .map(row => `${row.input1.trim()},${row.input2.trim()}`)
      .join(',');
  };

  // Add a new row to a section
  const addSectionRow = (sectionKey) => {
    setSectionData(prev => ({
      ...prev,
      [selectedOption]: {
        ...prev[selectedOption],
        [sectionKey]: [
          ...(prev[selectedOption]?.[sectionKey] || []),
          { input1: '', input2: '' }
        ]
      }
    }));
  };

  // Update a row in a section
  const updateSectionRow = (sectionKey, rowIndex, field, value) => {
    setSectionData(prev => {
      const newSectionData = { ...prev };
      const sectionData = [...(newSectionData[selectedOption]?.[sectionKey] || [])];
      
      if (!sectionData[rowIndex]) {
        sectionData[rowIndex] = { input1: '', input2: '' };
      }
      
      sectionData[rowIndex] = {
        ...sectionData[rowIndex],
        [field]: value
      };
      
      return {
        ...newSectionData,
        [selectedOption]: {
          ...(newSectionData[selectedOption] || {}),
          [sectionKey]: sectionData
        }
      };
    });
  };

  // Remove a row from a section
  const removeSectionRow = (sectionKey, rowIndex) => {
    setSectionData(prev => ({
      ...prev,
      [selectedOption]: {
        ...prev[selectedOption],
        [sectionKey]: (prev[selectedOption]?.[sectionKey] || []).filter((_, i) => i !== rowIndex)
      }
    }));
  };

  const renderSavedRows = (sectionKey) => {
    const savedRows = transformApiDataToUi(sectionData[selectedOption]?.[sectionKey]);
    
    return (
      <>
        {savedRows.map((row, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ 
              display: 'flex', 
              flex: 1, 
              gap: '8px',
              backgroundColor: '#f2f2f2',
              padding: '8px',
              borderRadius: '8px',
              height: '28px'
            }}>
              <E.InputText 
                value={row.input1 || ''} 
                onChange={(e) => updateSectionRow(sectionKey, index, 'input1', e.target.value)}
                placeholder="수량 (예: 100)"
                style={{ 
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '8px 0'
                }}
              />
              <img src={line} alt="line" />
              <E.InputText 
                value={row.input2 || ''} 
                onChange={(e) => updateSectionRow(sectionKey, index, 'input2', e.target.value)}
                placeholder="가격 (예: 500)"
                style={{ 
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '8px 0'
                }}
              />
            </div>
            <button 
              onClick={() => removeSectionRow(sectionKey, index)}
              style={{
                background: '#ff4d4f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginLeft: '8px'
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </>
    );
  };

  const handleSave = async () => {
    const content = getCardContent(selectedOption);
    const currentData = sectionData[selectedOption] || {};
    
    // Section validation removed as per user request
    
    if (!minOrderQuantity.trim()) {
      alert('최소 주문 수량을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      let apiUrl, requestData, method;
      
      if (isEditMode) {
        // 수정 모드일 때의 기존 로직 유지
        method = 'PATCH';
        apiUrl = `${import.meta.env.VITE_API_BASE}printshops/${id}/update/`;
        requestData = {
          current_password: prompt('현재 비밀번호를 입력해주세요:'),
          equipment_list: localSavedOptions,
          available_categories: [selectedOption],
          production_time: inputValues.production_time || '',
          delivery_options: inputValues.delivery_options || '',
          bulk_discount: inputValues.bulk_discount || ''
        };

        const sectionMappings = {
          'card': {
            'section1': 'business_card_paper_options',
            'section2': 'business_card_printing_options',
            'section3': 'business_card_finishing_options'
          },
          'banner': {
            'section1': 'banner_size_options',
            'section2': 'banner_stand_options'
          },
          'poster': {
            'section1': 'poster_paper_options',
            'section2': 'poster_coating_options'
          },
          'sticker': {
            'section1': 'sticker_type_options',
            'section2': 'sticker_size_options'
          },
          'banner2': {
            'section1': 'banner_large_size_options',
            'section2': 'banner_large_processing_options'
          },
          'brochure': {
            'section1': 'brochure_paper_options',
            'section2': 'brochure_size_options',
            'section3': 'brochure_folding_options'
          }
        };

        // Process each section and add to request data
        Object.entries(sectionMappings[selectedOption]).forEach(([sectionKey, apiKey]) => {
          if (currentData[sectionKey] && currentData[sectionKey].length > 0) {
            requestData[apiKey] = transformUiDataToApi(currentData[sectionKey]);
          }
        });
      } else {
        // 등록 모드일 때의 새로운 로직
        method = 'PUT';
        apiUrl = `${import.meta.env.VITE_API_BASE}printshops/${id}/update-step2/`;
        
        const sectionMappings = {
          'card': {
            'section1': 'business_card_paper_options',
            'section2': 'business_card_printing_options',
            'section3': 'business_card_finishing_options',
            'quantity_price_info': 'card_quantity_price_info'
          },
          'banner': {
            'section1': 'banner_size_options',
            'section2': 'banner_stand_options',
            'quantity_price_info': 'banner_quantity_price_info'
          },
          'poster': {
            'section1': 'poster_paper_options',
            'section2': 'poster_coating_options',
            'quantity_price_info': 'poster_quantity_price_info'
          },
          'sticker': {
            'section1': 'sticker_type_options',
            'section2': 'sticker_size_options',
            'quantity_price_info': 'sticker_quantity_price_info'
          },
          'banner2': {
            'section1': 'banner_large_size_options',
            'section2': 'banner_large_processing_options',
            'quantity_price_info': 'banner_large_quantity_price_info'
          },
          'brochure': {
            'section1': 'brochure_paper_options',
            'section2': 'brochure_size_options',
            'section3': 'brochure_folding_options',
            'quantity_price_info': 'brochure_quantity_price_info'
          }
        };

        requestData = {
          available_categories: localSavedOptions.includes(selectedOption) 
            ? localSavedOptions 
            : [...localSavedOptions, selectedOption]
        };

        // Process each section and add to request data
        Object.entries(sectionMappings[selectedOption]).forEach(([sectionKey, apiKey]) => {
          if (sectionKey === 'quantity_price_info') {
            if (minOrderQuantity) {
              requestData[apiKey] = minOrderQuantity;
            }
          } else if (currentData[sectionKey] && currentData[sectionKey].length > 0) {
            requestData[apiKey] = transformUiDataToApi(currentData[sectionKey]);
          }
        });
      }

      // Prepare the request data
      const cleanRequestData = {
        ...requestData,
        // Ensure arrays are properly formatted
        equipment_list: Array.isArray(localSavedOptions) && localSavedOptions.length > 0
          ? localSavedOptions
          : [selectedOption],
        available_categories: Array.isArray(localSavedOptions) && localSavedOptions.length > 0
          ? localSavedOptions.includes(selectedOption)
            ? localSavedOptions
            : [...localSavedOptions, selectedOption]
          : [selectedOption],
        // Ensure these fields are strings
        production_time: String(inputValues.production_time || ''),
        delivery_options: Array.isArray(inputValues.delivery_options)
          ? inputValues.delivery_options.join(',')
          : String(inputValues.delivery_options || ''),
        bulk_discount: Array.isArray(inputValues.bulk_discount)
          ? inputValues.bulk_discount.join(',')
          : String(inputValues.bulk_discount || '')
      };

      // Process each section and add to request data
      const sectionMappings = {
        'card': {
          'section1': 'business_card_paper_options',
          'section2': 'business_card_printing_options',
          'section3': 'business_card_finishing_options',
          'quantity_price_info': 'business_card_quantity_price_info'
        },
        'banner': {
          'section1': 'banner_size_options',
          'section2': 'banner_stand_options',
          'quantity_price_info': 'banner_quantity_price_info'
        },
        'poster': {
          'section1': 'poster_paper_options',
          'section2': 'poster_coating_options',
          'quantity_price_info': 'poster_quantity_price_info'
        },
        'sticker': {
          'section1': 'sticker_type_options',
          'section2': 'sticker_size_options',
          'quantity_price_info': 'sticker_quantity_price_info'
        },
        'banner2': {
          'section1': 'banner_large_size_options',
          'section2': 'banner_large_processing_options',
          'quantity_price_info': 'banner_large_quantity_price_info'
        },
        'brochure': {
          'section1': 'brochure_paper_options',
          'section2': 'brochure_size_options',
          'section3': 'brochure_folding_options',
          'quantity_price_info': 'brochure_quantity_price_info'
        }
      };

      // Add section data to request
      Object.entries(sectionMappings[selectedOption] || {}).forEach(([sectionKey, apiKey]) => {
        if (sectionKey === 'quantity_price_info') {
          if (minOrderQuantity) {
            cleanRequestData[apiKey] = minOrderQuantity.trim();
          }
        } else if (currentData[sectionKey]?.length > 0) {
          cleanRequestData[apiKey] = transformUiDataToApi(currentData[sectionKey]);
        }
      });

      // Remove any undefined or empty values
      Object.keys(cleanRequestData).forEach(key => {
        if (cleanRequestData[key] === undefined || cleanRequestData[key] === '') {
          delete cleanRequestData[key];
        }
      });

      console.log("Sending data to server:", cleanRequestData);
      
      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(cleanRequestData),
      });

      let result;
      try {
        const responseText = await response.text();
        result = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('서버 응답을 처리하는 중 오류가 발생했습니다.');
      }

      console.log("Server response:", response.status, result);

      if (!response.ok) {
        const errorMessage = result.detail || 
                           result.message || 
                           Object.values(result).flat().join('\n') ||
                           `서버 오류 (${response.status})`;
        throw new Error(errorMessage);
      }

      // Save to local state and context
      const newSavedOptions = localSavedOptions.includes(selectedOption) 
        ? localSavedOptions 
        : [...localSavedOptions, selectedOption];
      
      setLocalSavedOptions(newSavedOptions);
      setSavedOptions(newSavedOptions);
      
      alert('성공적으로 저장되었습니다!');
      
    } catch (error) {
      console.error('Error saving data:', error);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // API 응답 데이터를 섹션별로 분리하는 함수
  const processApiDataToSections = (apiData) => {
    const result = {};
    
    // 각 장비 타입별로 처리
    const equipmentMappings = {
      'banner_large': 'banner2',
      'business_card': 'card',
      'banner': 'banner',
      'poster': 'poster',
      'sticker': 'sticker',
      'brochure': 'brochure'
    };

    // 각 장비 타입별로 데이터 처리
    Object.entries(equipmentMappings).forEach(([apiPrefix, uiId]) => {
      const sections = {
        section1: [],
        section2: [],
        section3: []
      };

      // 필드 매핑 (API 필드명 -> 섹션 매핑)
      const fieldMappings = [
        { field: `${apiPrefix}_paper_options`, section: 'section1' },
        { field: `${apiPrefix}_printing_options`, section: 'section1' },
        { field: `${apiPrefix}_finishing_options`, section: 'section1' },
        { field: `${apiPrefix}_size_options`, section: 'section2' },
        { field: `${apiPrefix}_stand_options`, section: 'section2' },
        { field: `${apiPrefix}_coating_options`, section: 'section2' },
        { field: `${apiPrefix}_type_options`, section: 'section3' },
        { field: `${apiPrefix}_processing_options`, section: 'section3' },
        { field: `${apiPrefix}_folding_options`, section: 'section3' }
      ];

      // 각 필드별로 데이터 처리
      fieldMappings.forEach(({ field, section }) => {
        if (apiData[field]) {
          try {
            const items = apiData[field].split(',').map(item => item.trim());
            
            // 항목들을 순회하며 input1, input2 쌍으로 분리
            for (let i = 0; i < items.length; i += 2) {
              if (items[i]) {
                sections[section].push({
                  input1: items[i],
                  input2: items[i + 1] || ''
                });
              }
            }
          } catch (error) {
            console.error(`Error processing field ${field}:`, error);
          }
        }
      });

      // 결과에 추가 (비어있지 않은 섹션만)
      if (Object.values(sections).some(section => section.length > 0)) {
        result[uiId] = sections;
      }
    });

    return result;
  };

  // Load saved data in edit mode or when selected option changes
  useEffect(() => {
    const loadSavedData = async () => {
      if (!isEditMode || !id) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}printshops/${id}/`);
        if (!response.ok) throw new Error('Failed to load saved data');
        
        const data = await response.json();
        console.log('Loaded saved data:', data);
        
        // Transform API data to UI format
        const transformedData = {};
        
        // Map API fields to section keys based on selected option
        const sectionMappings = {
          'card': {
            'section1': 'business_card_paper_options',
            'section2': 'business_card_printing_options',
            'section3': 'business_card_finishing_options'
          },
          'banner': {
            'section1': 'banner_size_options',
            'section2': 'banner_stand_options'
          },
          'poster': {
            'section1': 'poster_paper_options',
            'section2': 'poster_coating_options'
          },
          'sticker': {
            'section1': 'sticker_type_options',
            'section2': 'sticker_size_options'
          },
          'banner2': {
            'section1': 'banner_large_size_options',
            'section2': 'banner_large_processing_options'
          },
          'brochure': {
            'section1': 'brochure_paper_options',
            'section2': 'brochure_size_options',
            'section3': 'brochure_folding_options'
          }
        };
        
        // Get the mapping for the current selected option
        const currentMappings = sectionMappings[selectedOption] || {};
        
        // Process each section and map to section data
        Object.entries(currentMappings).forEach(([sectionKey, apiField]) => {
          if (data[apiField]) {
            const sectionData = transformApiDataToUi(data[apiField]);
            if (sectionData.length > 0) {
              transformedData[sectionKey] = sectionData;
            }
          }
        });
        
        // Update state with transformed data for the current selected option
        setSectionData(prev => ({
          ...prev,
          [selectedOption]: {
            ...prev[selectedOption],
            ...transformedData
          }
        }));
        
        // Set other form fields if they don't have values yet
        if (data.min_order_quantity && !minOrderQuantity) {
          setMinOrderQuantity(data.min_order_quantity);
        }
        
        // Set available categories if not set
        if (data.available_categories?.length > 0 && localSavedOptions.length === 0) {
          setLocalSavedOptions(data.available_categories);
        }
        
        // Set input values for quantity price info
        const newInputValues = {};
        const quantityMappings = {
          banner: 'banner_quantity_price_info',
          banner2: 'banner_large_quantity_price_info',
          poster: 'poster_quantity_price_info',
          brochure: 'brochure_quantity_price_info',
          sticker: 'sticker_quantity_price_info',
          card: 'business_card_quantity_price_info'
        };
        
        // Set quantity for the current selected option
        const currentQuantityField = quantityMappings[selectedOption];
        if (data[currentQuantityField]) {
          setMinOrderQuantity(String(data[currentQuantityField]));
          newInputValues[`${selectedOption}_quantity`] = String(data[currentQuantityField]);
        }
        
        // Also set quantities for other options if they exist
        Object.entries(quantityMappings).forEach(([uiId, apiField]) => {
          if (data[apiField] && uiId !== selectedOption) {
            newInputValues[`${uiId}_quantity`] = String(data[apiField]);
          }
        });
        
        if (Object.keys(newInputValues).length > 0) {
          setInputValues(prev => ({
            ...prev,
            ...newInputValues
          }));
        }
        
      } catch (error) {
        console.error('Error loading saved data:', error);
        alert('저장된 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };
    
    loadSavedData();
  }, [isEditMode, id, selectedOption, minOrderQuantity, localSavedOptions.length]);

  // 폼 유효성 검사 함수
  const isFormValid = () => {
    // 모든 유효성 검사 통과
    return true;
  };

  const formatDataForApi = (data) => {
    // Map UI field names to API field names for quantity info
    const quantityMappings = {
      'banner_quantity': 'banner_quantity_price_info',
      'banner2_quantity': 'banner_large_quantity_price_info',
      'poster_quantity': 'poster_quantity_price_info',
      'brochure_quantity': 'brochure_quantity_price_info',
      'sticker_quantity': 'sticker_quantity_price_info',
      'card_quantity': 'business_card_quantity_price_info'
    };

    const formattedData = {
      available_categories: localSavedOptions,
      ...sectionData,
      delivery_options: data.delivery_options || '',
      production_time: data.production_time || '',
      bulk_discount: data.bulk_discount || ''
    };

    // Add quantity info with correct API field names
    Object.entries(quantityMappings).forEach(([uiField, apiField]) => {
      if (data[uiField]) {
        formattedData[apiField] = data[uiField];
      }
    });

    return formattedData;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    // 새로 등록하는 경우에만 폼 유효성 검사
    if (!isEditMode && !isFormValid()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedData = formatDataForApi(inputValues);
      
      // Save to context for next step
      setSavedOptions({
        selectedOption,
        localSavedOptions,
        sectionData,
        minOrderQuantity,
        inputValues,
        productionTime: inputValues.production_time || '',
        deliveryMethods: inputValues.delivery_options ? inputValues.delivery_options.split(',').map(s => s.trim()) : [],
        discountRules: inputValues.bulk_discount ? inputValues.bulk_discount.split(',').map(s => s.trim()) : []
      });
      
      // In edit mode, update the printshop data
      if (isEditMode) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}printshops/${id}/update-step2/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formattedData,
            equipment_list: localSavedOptions,
            available_categories: localSavedOptions.includes(selectedOption) 
              ? localSavedOptions 
              : [...localSavedOptions, selectedOption]
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || '업데이트에 실패했습니다.');
        }
        
        alert('수정이 완료되었습니다.');
        window.location.href = '/printshopPage';
      } else {
        // For new registration, use handleSave which is already implemented
        await handleSave();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`서버 요청 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <E.Container>
      {/* 상단 메뉴 */}
      <E.Menu>
        <E.MenuInner>
          <E.TopBar>
            <E.CancelBtn onClick={() => setShowCancelModal(true)}>취소하기</E.CancelBtn>
            <E.Title>{isEditMode ? '인쇄소 수정 [2/2]' : '인쇄소 등록 [2/3]'}</E.Title>
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
                  <img 
                    src={
                      localSavedOptions.includes(option.id)
                        ? option.image.replace('.png', '-blue.png')
                        : selectedOption === option.id
                        ? option.image.replace('.png', '-black.png')
                        : option.image
                    } 
                    alt={option.name} 
                  />
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

            {/* 수량 및 가격 정보 & 버튼 */}
            <E.Footer>
              <E.MinOrder>
                <E.FormLabel>수량 및 가격 정보</E.FormLabel>
                <E.MinOrderInput 
                  placeholder="예: 1개당 100원" 
                  value={minOrderQuantity}
                  onChange={(e) => setMinOrderQuantity(e.target.value)}
                />
              </E.MinOrder>

              <E.SubmitBtn onClick={handleSave} disabled={!isFormValid()}>
                저장
              </E.SubmitBtn>
            </E.Footer>
          </E.InputCard>
        </E.Content>
      </E.MainWrapper>
      {showCancelModal && (
        isEditMode ? (
          <Modal4
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => navigate('/printshopPage')}
          />
        ) : (
          <Modal3 
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => navigate('/printshopPage')}
          />
        )
      )}
    </E.Container>
  );
};

export default Register2;