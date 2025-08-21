//import Background2 from "../../assets/Score/body2.svg";
const BG_URL = new URL("../../assets/Score/body2.svg", import.meta.url).href;
import S from "./SecondScoreSection.styles.js"; 

export default function SecondScoreSection() {

    return (
        <S.Container $bg={BG_URL}>
        <S.ReportContainer>
            <S.Title>최종 견적을 확인하세요</S.Title>
            <S.ContentContainer>
                <S.Header></S.Header>
                <S.Content>
                    <S.Context>dsxcdd</S.Context>
                </S.Content>
            </S.ContentContainer>
        </S.ReportContainer>
        </S.Container>
    );
}