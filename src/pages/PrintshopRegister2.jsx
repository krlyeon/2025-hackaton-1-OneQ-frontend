import GlobalStyle from "../App.js";
import Register2 from "../components/Printshop/Register2.jsx";
import Register22 from "../components/Printshop/Register2-2.jsx";
import Footer from "../components/Footer.jsx";
import { PrintshopProvider } from "../contexts/PrintshopContext.jsx";

export default function PrintshopPage() {
  return (
    <PrintshopProvider>
      <main>
        <GlobalStyle />
        <Register2 />
        <Register22 />
        <Footer />
      </main>
    </PrintshopProvider>
  );
}