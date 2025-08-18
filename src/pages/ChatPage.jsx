import GlobalStyle from "../App.js";
import NavBarChose from "../components/Chose/NavBarChose.jsx";
import Chat from "../components/Chats/ChatBox.jsx";

export default function ChosePage() {
  return (
    <main>
      <GlobalStyle />
      <NavBarChose />
      <Chat />
    </main>
  );
}
