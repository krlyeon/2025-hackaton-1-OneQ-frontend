import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const PrintshopContext = createContext();

export const usePrintshop = () => {
  const context = useContext(PrintshopContext);
  if (!context) {
    throw new Error("usePrintshop must be used within a PrintshopProvider");
  }
  return context;
};

export const PrintshopProvider = ({ children }) => {
  // Register2에서 저장된 옵션들 추적
  const [savedOptions, setSavedOptions] = useState({
    available_categories: [],
    production_time: "",
    delivery_options: [],
    bulk_discount: [],
    localSavedOptions: [],
    sectionData: {},
    minOrderQuantity: "",
    inputValues: {},
  });

  // Register2에서 입력된 상세 데이터 저장
  const [sectionData, setSectionData] = useState({});
  const [description, setDescription] = useState("");

  // Register2-2에서 입력된 데이터
  const [productionTime, setProductionTime] = useState("");
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [discountRules, setDiscountRules] = useState([]);

  // 인쇄소 ID (URL에서 가져오거나 다른 방법으로 설정)
  const [printshopId, setPrintshopId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // API에서 데이터를 로드하는 함수
  const loadPrintshopData = useCallback(async (id) => {
    if (!id) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}printshops/${id}/`
      );
      if (!response.ok) throw new Error("Failed to fetch printshop data");

      const data = await response.json();
      console.log("Loaded printshop data:", data);

      if (!data) {
        console.error("No data received from API");
        return;
      }

      // Process delivery options - keep as string if it's a string, or as array if it's already an array
      let deliveryOptions = data.delivery_options || [];

      // Process discount rules - keep as string if it's a string, or as array if it's already an array
      let discountRules = data.bulk_discount || [];

      try {
        if (typeof deliveryOptions === "string") {
          deliveryOptions = JSON.parse(deliveryOptions);
        }
        if (typeof discountRules === "string") {
          discountRules = JSON.parse(discountRules);
        }
      } catch (e) {
        console.error("Failed to parse delivery_options or bulk_discount:", e);
      }

      // Update states
      setProductionTime(data.production_time || "");
      setDeliveryMethods(
        Array.isArray(deliveryOptions)
          ? deliveryOptions
          : [deliveryOptions].filter(Boolean)
      );
      setDiscountRules(
        Array.isArray(discountRules)
          ? discountRules
          : [discountRules].filter(Boolean)
      );

      // Update savedOptions with all necessary data
      setSavedOptions((prev) => ({
        ...prev,
        available_categories: data.available_categories || [],
        production_time: data.production_time || "",
        delivery_options: deliveryOptions,
        bulk_discount: discountRules,
        localSavedOptions: data.available_categories || [],
        minOrderQuantity: data.min_order_quantity || "",
        inputValues: {
          ...prev.inputValues,
          production_time: data.production_time || "",
          delivery_options: Array.isArray(deliveryOptions)
            ? deliveryOptions.join(", ")
            : deliveryOptions,
          bulk_discount: Array.isArray(discountRules)
            ? discountRules.join(", ")
            : discountRules,
        },
      }));

      // Process section data if available
      if (data.sectionData) {
        setSectionData(data.sectionData);
      }
    } catch (error) {
      console.error("Error loading printshop data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data when printshopId changes
  useEffect(() => {
    if (printshopId) {
      loadPrintshopData(printshopId);
    }
  }, [printshopId, loadPrintshopData]);

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
    isLoading,
    loadPrintshopData,
  };

  return (
    <PrintshopContext.Provider value={value}>
      {children}
    </PrintshopContext.Provider>
  );
};
