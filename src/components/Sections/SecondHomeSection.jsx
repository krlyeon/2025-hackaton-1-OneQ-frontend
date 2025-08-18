import React, { useState } from "react";
import * as S from "./SecondHomeSection.styles";

import bg2 from "../../assets/bg2.png";
import iconConnect from "../../assets/icon-connect.png";
import iconConnectHover from "../../assets/icon-connect-hover.png";
import iconCompare from "../../assets/icon-compare.png";
import iconCompareHover from "../../assets/icon-compare-hover.png";
import iconVerify from "../../assets/icon-verify.png";
import iconVerifyHover from "../../assets/icon-verify-hover.png";

const SecondHomeSection = () => {
  const features = [
    {
      icon: iconConnect,
      iconHover: iconConnectHover,
      title: "빠른 연결",
      description: "채팅 한 번으로 간편하게 완성하는 견적",
    },
    {
      icon: iconCompare,
      iconHover: iconCompareHover,
      title: "똑똑한 비교",
      description: "한 눈에 확인하는 최적 견적",
    },
    {
      icon: iconVerify,
      iconHover: iconVerifyHover,
      title: "검증된 데이터",
      description: "인증된 데이터로 산출된 믿을 수 있는 견적",
    },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <S.Container backgroundImage={bg2}>
      <S.Title>
        The Smarter Way to <span>Print</span>
      </S.Title>
      <S.Subtitle>
        수십 개 인쇄소의 가격과 조건을 복잡한 절차 없이 한 번에 비교하세요.{" "}
        <br />
        당신이 원하는 인쇄를 가장 빠르고 똑똑한 방법으로 찾아드립니다.
      </S.Subtitle>

      <S.CardGrid>
        {features.map((item, index) => (
          <S.Card
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <S.Icon src={hovered === index ? item.iconHover : item.icon} alt={item.title} />
            <S.CardTitle>{item.title}</S.CardTitle>
            <S.CardDesc $hovered={hovered === index}>{item.description}</S.CardDesc>
          </S.Card>
        ))}
      </S.CardGrid>
    </S.Container>
  );
};

export default SecondHomeSection;

