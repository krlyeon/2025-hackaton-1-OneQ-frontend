import React, { useState } from "react";
import * as C from "./NavBarChats.styles";

import arrowBackIcon from "../../assets/arrow-back.png";
import dottedLineIcon from "../../assets/line-dotted.png";
import checkBarIcon from "../../assets/check-bar.png";
import arrowRightBarIcon from "../../assets/arrow-right-bar.png";

const NavBarChose = () => {
  const [showBalloon, setShowBalloon] = useState(false);

  return (
    <C.NavBarContainer>
      <C.Left>
        <C.BackButton>
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
            <C.Advice onClick={() => setShowBalloon((prev) => !prev)}>
              i
            </C.Advice>
          </C.Step>
        </C.ProgressWrapper>
      </C.Center>
      <C.Right>
        <C.GoButton>
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
    </C.NavBarContainer>
  );
};

export default NavBarChose;
