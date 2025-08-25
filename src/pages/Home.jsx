import NavBar from "../components/NavBar.jsx";
import GlobalStyle from "../styles/GlobalStyle.js";
import FirstHomeSection from "../components/Sections/FirstHomeSection.jsx";
import SecondHomeSection from "../components/Sections/SecondHomeSection.jsx";
import ThirdHomeSection from "../components/Sections/ThirdHomeSection.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <main>
      <GlobalStyle />
      <NavBar />
      <FirstHomeSection />
      <SecondHomeSection />
      <div id="third-section">
        <ThirdHomeSection />
      </div>
      <Footer />
    </main>
  );
}
