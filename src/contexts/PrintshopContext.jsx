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
  
  // Register2-2에서 입력된 데이터
  const [productionTime, setProductionTime] = useState('');
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [discountRules, setDiscountRules] = useState([]);

  const value = {
    savedOptions,
    setSavedOptions,
    productionTime,
    setProductionTime,
    deliveryMethods,
    setDeliveryMethods,
    discountRules,
    setDiscountRules,
  };

  return (
    <PrintshopContext.Provider value={value}>
      {children}
    </PrintshopContext.Provider>
  );
};
