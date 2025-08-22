import React, { createContext, useContext, useState } from 'react';

const PrintshopContext = createContext();

export const usePrintshop = () => {
  const context = useContext(PrintshopContext);
  if (!context) {
    throw new Error('usePrintshop must be used within a PrintshopProvider');
  }
  return context;
};

export const PrintshopProvider = ({ children }) => {
  // Register2에서 저장된 옵션들 추적
  const [savedOptions, setSavedOptions] = useState([]);
  
  // Register2에서 입력된 상세 데이터 저장
  const [sectionData, setSectionData] = useState({});
  const [description, setDescription] = useState('');
  
  // Register2-2에서 입력된 데이터
  const [productionTime, setProductionTime] = useState('');
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [discountRules, setDiscountRules] = useState([]);
  
  // 인쇄소 ID (URL에서 가져오거나 다른 방법으로 설정)
  const [printshopId, setPrintshopId] = useState(null);

  const value = {
    savedOptions,
    setSavedOptions,
    sectionData,
    setSectionData,
    description,
    setDescription,
    productionTime,
    setProductionTime,
    deliveryMethods,
    setDeliveryMethods,
    discountRules,
    setDiscountRules,
    printshopId,
    setPrintshopId,
  };

  return (
    <PrintshopContext.Provider value={value}>
      {children}
    </PrintshopContext.Provider>
  );
};
