// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ChosePage from "./pages/ChosePage.jsx"; // 채팅/선택 페이지
import ChatPage from "./pages/ChatPage.jsx"; // 채팅/선택 페이지
import ScorePage from "./pages/ScorePage.jsx"; // 원큐스코어 페이지
import PrintshopPage from "./pages/PrintshopPage.jsx";
import PrintshopRegister from "./pages/PrintshopRegister.jsx";
import PrintshopRegister2 from "./pages/PrintshopRegister2.jsx";
import PrintshopRegister3 from "./pages/PrintshopRegister3.jsx";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chose" element={<ChosePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/printshopPage" element={<PrintshopPage />} />
        <Route path="/printshopRegister" element={<PrintshopRegister />} />
        <Route path="/printshopRegister2" element={<PrintshopRegister2 />} />
        <Route path="/printshopRegister3" element={<PrintshopRegister3 />} />
      </Routes>
  );
}
