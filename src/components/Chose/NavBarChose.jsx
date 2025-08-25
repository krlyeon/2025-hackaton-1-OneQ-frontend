import React, { useState } from "react";
import * as C from "./NavBarChose.styles";
import { useNavigate } from "react-router-dom";
import arrowBackIcon from "../../assets/arrow-back.png";
import dottedLineIcon from "../../assets/line-dotted.png";

const NavBarChose = () => {
  const [showBalloon, setShowBalloon] = useState(false);
  const navigate = useNavigate();

  return (
    <C.NavBarContainer>
      <C.Left>
        <C.BackButton>
          <img src={arrowBackIcon} alt="뒤로가기" onClick={() => navigate("/")}/>
        </C.BackButton>
      </C.Left>
      <C.Center>
        <C.ProgressWrapper>
          <C.Step>
            <C.StepNumberChecked>1</C.StepNumberChecked>
            <C.StepLabelChecked>인쇄물 선택</C.StepLabelChecked>
          </C.Step>
          <C.DottedLine>
            <img src={dottedLineIcon} alt="dotted line" />
          </C.DottedLine>
          <C.Step>
            <C.StepNumber>2</C.StepNumber>
            <C.StepLabel>견적 구성</C.StepLabel>
          </C.Step>
          <C.DottedLine>
            <img src={dottedLineIcon} alt="dotted line" />
          </C.DottedLine>
          <C.Step>
            <C.StepNumber>3</C.StepNumber>
            <C.StepLabel>원큐 스코어</C.StepLabel>
            <C.Advice onClick={() => setShowBalloon((prev) => !prev)}>
              i
            </C.Advice>
          </C.Step>
        </C.ProgressWrapper>
      </C.Center>
      <C.Right />

      {showBalloon && (
        <C.Balloon>
          <C.Triangle />
          <C.BalloonBox>
            입력한 견적을 기준으로 상위 3개 인쇄소를 추천합니다. 각 인쇄소의
            점수·세부 항목과 정보를 확인할 수 있습니다.
          </C.BalloonBox>
        </C.Balloon>
      )}
    </C.NavBarContainer>
  );
};

export default NavBarChose;
