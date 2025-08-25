// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrintshopProvider } from "./contexts/PrintshopContext";
import Home from "./pages/Home.jsx";
import ChosePage from "./pages/ChosePage.jsx"; // 채팅/선택 페이지
import ChatPage from "./pages/ChatPage.jsx"; // 채팅/선택 페이지
import ScorePage from "./pages/ScorePage.jsx";
import PrintshopPage from "./pages/PrintshopPage.jsx";
import PrintshopRegister from "./pages/PrintshopRegister.jsx";
import PrintshopRegister2 from "./pages/PrintshopRegister2.jsx";
import PrintshopRegister3 from "./pages/PrintshopRegister3.jsx";

console.log("App ScorePage binding =", ScorePage);

export default function App() {
  return (
    <PrintshopProvider>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chose" element={<ChosePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/score" element={<ScorePage />} />
      <Route path="/printshopPage" element={<PrintshopPage />} />
      <Route path="/printshopRegister" element={<PrintshopRegister />} />
      <Route path="/printshopRegister2/:id" element={<PrintshopRegister2 />} />
      <Route path="/printshopRegister3/:id" element={<PrintshopRegister3 />} />
      </Routes>
    </PrintshopProvider>
  );
}
