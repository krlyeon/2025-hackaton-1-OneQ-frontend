import { useParams } from "react-router-dom";
import { useEffect } from "react";
import GlobalStyle from "../App.js";
import Register2 from "../components/Printshop/Register2.jsx";
import Register22 from "../components/Printshop/Register2-2.jsx";
import Footer from "../components/Footer.jsx";
import { PrintshopProvider, usePrintshop } from "../contexts/PrintshopContext.jsx";

// Wrapper component to handle printshopId logic
function PrintshopRegister2Content() {
  const { id } = useParams();
  const { setPrintshopId } = usePrintshop();

  // Set printshopId from URL when component mounts or id changes
  useEffect(() => {
    if (id) {
      setPrintshopId(id);
      localStorage.setItem('printshopId', id);
    } else {
      // If no ID in URL, try to get it from localStorage
      const savedId = localStorage.getItem('printshopId');
      if (savedId) {
        setPrintshopId(savedId);
      }
    }
  }, [id, setPrintshopId]);

  return (
    <>
      <Register2 />
      <Register22 />
    </>
  );
}

export default function PrintshopPage() {
  return (
    <PrintshopProvider>
      <main>
        <GlobalStyle />
        <PrintshopRegister2Content />
        <Footer />
      </main>
    </PrintshopProvider>
  );
}