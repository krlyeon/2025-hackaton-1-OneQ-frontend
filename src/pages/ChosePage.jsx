import GlobalStyle from "../styles/GlobalStyle.js";
import NavBarChose from "../components/Chose/NavBarChose.jsx";
import Chose from "../components/Chose/Chose.jsx";

export default function ChosePage() {
  return (
    <main>
      <GlobalStyle />
      <NavBarChose />
      <Chose />
    </main>
  );
}
