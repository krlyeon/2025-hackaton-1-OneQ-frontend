import Background1 from "../../assets/Score/body1.svg";
import BiglogoImg from "../../assets/Score/logo.svg";

import S from "./FirstScoreSection.styles.js"; 

export default function FirstScoreSection() {
    return (
        <S.Container $bg={Background1}>
        <S.LogoContainer>
            <S.BigLogo src={BiglogoImg} alt="ONEQ Logo" />
            <S.SubTitle>견적에 맞는 최적의 인쇄소 3곳을 추천드립니다.</S.SubTitle>
        </S.LogoContainer>
        </S.Container>
    );
}