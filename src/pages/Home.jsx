import NavBar from "../components/NavBar.jsx";
import GlobalStyle from "./App.js";
import FirstHomeSection from "../components/Sections/FirstHomeSection.jsx";
import SecondHomeSection from "../components/Sections/SecondHomeSection.jsx";
import ThirdHomeSection from "../components/Sections/ThirdHomeSection.jsx";

export default function Home() {
  return (
    <main>
      <GlobalStyle />
      <NavBar />
      <FirstHomeSection />
      <SecondHomeSection />
      <ThirdHomeSection />
    </main>
  );
}
