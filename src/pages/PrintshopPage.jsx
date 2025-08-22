import GlobalStyle from "../styles/GlobalStyle.js";
import NavBar from "../components/NavBar.jsx";
import PrintshopHome from "../components/Printshop/PrintshopHome.jsx";
import PrintshopList from "../components/Printshop/PrintshopList.jsx";
import Footer from "../components/Footer.jsx";

export default function PrintshopPage() {
  return (
    <main>
      <GlobalStyle />
      <NavBar />
      <PrintshopHome />
      <PrintshopList />
      <Footer />
    </main>
  );
} 
