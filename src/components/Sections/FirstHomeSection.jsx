import BiglogoImg from "../../assets/oneq-big-logo.svg";
import ChevronsImg from "../../assets/chevrons.svg";
import BackGroundImg from "../../assets/main-background.svg"
import S from "./FirstHomeSection.styles.js"; 

export default function FirstHomeSection() {
    return ( 
        <S.Container>
            <S.LogoContainer>
                <S.BigLogo src={BiglogoImg} alt="ONEQ Logo"></S.BigLogo>
            </S.LogoContainer>
            <S.BottomSection>
            <S.Title>
                누구나 한 번에 완성하는<br />손쉬운 인쇄 견적
            </S.Title>
            <S.Chevron src={ChevronsImg} alt="Chevrons"></S.Chevron>
            </S.BottomSection>
        </S.Container>
    );
}