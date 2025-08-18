// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ChosePage from "./pages/ChosePage.jsx"; // 채팅/선택 페이지
import ChatPage from "./pages/ChatPage.jsx"; // 채팅/선택 페이지


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chose" element={<ChosePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/estimate" element={<EstimatePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
