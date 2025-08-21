import React from "react";
import * as P from "./PrintshopHome.styles";
import { useNavigate } from "react-router-dom";

const PrintshopHome = () => {
    const navigate = useNavigate();
  return (
    <P.BackgroundWrapper>
      <P.ContentWrapper>
        <P.TextGroup>
          <P.Title>내 인쇄소를 더 많은 고객에게 보여주세요.</P.Title>
          <P.Description>
            등록 한 번만으로도 인쇄소가 더 많은 소비자에게 노출됩니다.
          </P.Description>
        </P.TextGroup>
        <P.RegisterButton onClick={() => navigate("/printshopRegister")}>내 인쇄소 등록하기</P.RegisterButton>
      </P.ContentWrapper>
    </P.BackgroundWrapper>
  );
};

export default PrintshopHome;
