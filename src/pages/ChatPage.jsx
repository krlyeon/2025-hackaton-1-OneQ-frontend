import GlobalStyle from "../styles/GlobalStyle.js";
import NavBarChats from "../components/Chats/NavBarChats.jsx";
import Chat from "../components/Chats/ChatBox.jsx";

export default function ChatPage() {
    return (
        <main>
        <GlobalStyle />
        <NavBarChats/>
        <Chat />
        </main>
    );
}
