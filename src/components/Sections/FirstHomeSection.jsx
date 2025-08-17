import BiglogoImg from "../../assets/oneq-big-logo.svg";
import ChevronsImg from "../../assets/chevrons.svg";
import ChevronsHovered from "../../assets/chevrons-hovered.svg";

import { useState } from "react";
import S from "./FirstHomeSection.styles.js"; 

export default function FirstHomeSection() {
    const [hover, setHover] = useState(false);
  const handleScroll = () => {
    document.getElementById("third-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <S.BigLogo src={BiglogoImg} alt="ONEQ Logo" />
      </S.LogoContainer>
      <S.BottomSection>
        <S.Title>
          누구나 한 번에 완성하는<br />손쉬운 인쇄 견적
        </S.Title>
        <S.Chevron
            src={hover ? ChevronsHovered : ChevronsImg}
            alt="Chevrons"
            onClick={handleScroll}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
      </S.BottomSection>
    </S.Container>
  );
}