import React, { useState } from "react";
import * as C from "./NavBarChats.styles";

import arrowBackIcon from "../../assets/arrow-back.png";
import dottedLineIcon from "../../assets/line-dotted.png";
import checkBarIcon from "../../assets/check-bar.png";
import arrowRightBarIcon from "../../assets/arrow-right-bar.png";

import Modal1 from "../Common/Modal1.jsx";  
import Modal2 from "../Common/Modal2.jsx";       
import { useNavigate } from "react-router-dom";

const NavBarChose = () => {
  const [showBalloon, setShowBalloon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModal2Open, setIsModal2Open] = useState(false); 
  const navigate = useNavigate();                        

  
  const handleBack = () => setIsModalOpen(true);
  const handleKeep = () => setIsModalOpen(false);              
  const handleMove = () => {                                  
    // 라우터 안 쓰면: window.location.href = "/chose";
    navigate("/chose"); // 프로젝트 실제 경로로 변경
  };
  const openNextConfirm = () => setIsModal2Open(true);
  const closeNextConfirm = () => setIsModal2Open(false);
  const moveFromModal2 = () => {                            // 오른쪽 버튼 동작
    navigate("/chose"); // ← 실제 경로 알려주면 여기만 바꾸면 끝
  };
  return (
    <C.NavBarContainer>
      <C.Left>
        <C.BackButton onClick={handleBack}>                {/* ✅ 수정: 클릭 시 모달 오픈 */}
          <img src={arrowBackIcon} alt="뒤로가기" />
        </C.BackButton>
      </C.Left>
      <C.Center>
        <C.ProgressWrapper>
          <C.Step>
            <C.StepNumber>
              <img src={checkBarIcon} alt="체크 완료" />
            </C.StepNumber>
            <C.StepLabel>인쇄물 선택</C.StepLabel>
          </C.Step>
          <C.DottedLine>
            <img src={dottedLineIcon} alt="dotted line" />
          </C.DottedLine>
          <C.Step>
            <C.StepNumberChecked>2</C.StepNumberChecked>
            <C.StepLabelChecked>견적 구성</C.StepLabelChecked>
          </C.Step>
          <C.DottedLine>
            <img src={dottedLineIcon} alt="dotted line" />
          </C.DottedLine>
          <C.Step>
            <C.StepNumber>3</C.StepNumber>
            <C.StepLabel>원큐 스코어</C.StepLabel>
            <C.Advice onClick={() => setShowBalloon((prev) => !prev)}>i</C.Advice>
          </C.Step>
        </C.ProgressWrapper>
      </C.Center>
      <C.Right>
        <C.GoButton onClick={openNextConfirm}>
          <img src={arrowRightBarIcon} alt="arrow right" />
        </C.GoButton>
      </C.Right>

      {showBalloon && (
        <C.Balloon>
          <C.Triangle />
          <C.BalloonBox>
            입력한 견적을 기준으로 상위 3개 인쇄소를 추천합니다. 각 인쇄소의
            점수·세부 항목과 정보를 확인할 수 있습니다.
          </C.BalloonBox>
        </C.Balloon>
      )}
      
      {isModalOpen && <Modal1 onClose={handleKeep} onMove={handleMove} />}
      {isModal2Open && <Modal2 onClose={closeNextConfirm} onMove={moveFromModal2} />}
    </C.NavBarContainer>
  );
};

export default NavBarChose;
