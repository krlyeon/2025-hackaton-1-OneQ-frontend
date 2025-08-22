//import Background2 from "../../assets/Score/body2.svg";
const BG_URL = new URL("../../assets/Score/body3.svg", import.meta.url).href;
import S from "./ThirdScoreSection.styles.js"; 
import { useNavigate } from "react-router-dom";

export default function ThirdScoreSection() {
    const navigate = useNavigate();

    return (
        <S.Container $bg={BG_URL}>
        <S.Container2>
            <S.ReportContainer>
              <S.Header>
                <S.Title>견적에 맞는 최적의 인쇄소 3곳입니다</S.Title>
                <S.SubTitle>
                  <S.SubTitle1><S.Box1></S.Box1>작업 적합도</S.SubTitle1><S.SubTitle2><S.Box2></S.Box2>납기 충족도</S.SubTitle2><S.SubTitle3><S.Box3></S.Box3>가격 적합도</S.SubTitle3>
                </S.SubTitle>
              </S.Header>

              <S.PrintShopContainer>
                <S.Content>
                  <S.PrintInfo>example@gmail.com<br />010-1234-5678<br />경기도 수원시 몰라구 반갑동 13번길</S.PrintInfo>
                  <S.Content2>
                    <S.PlaceInfo>원큐 인쇄소<br /><S.TotalScore>80<S.Text>점</S.Text></S.TotalScore></S.PlaceInfo>
                    <S.Score>
                      <S.Score1><S.RealScore>20</S.RealScore><S.BaseScore>/ 40</S.BaseScore></S.Score1>
                      <S.Score2><S.RealScore>20</S.RealScore><S.BaseScore>/ 40</S.BaseScore></S.Score2>
                      <S.Score3><S.RealScore>20</S.RealScore><S.BaseScore>/ 40</S.BaseScore></S.Score3>
                    </S.Score>
                  </S.Content2>
                </S.Content>

                <S.Content>
                  <S.PrintInfo>example@gmail.com<br />010-1234-5678<br />경기도 수원시 몰라구 반갑동 13번길</S.PrintInfo>
                  <S.Content2>
                    <S.PlaceInfo>원큐 인쇄소<br />80점</S.PlaceInfo>
                    <S.Score>
                      <S.Score1>30/40</S.Score1>
                      <S.Score2>20/40</S.Score2>
                      <S.Score3>30/40</S.Score3>
                    </S.Score>
                  </S.Content2>
                </S.Content>

                <S.Content>
                  <S.PrintInfo>example@gmail.com<br />010-1234-5678<br />경기도 수원시 몰라구 반갑동 13번길</S.PrintInfo>
                  <S.Content2>
                    <S.PlaceInfo>원큐 인쇄소<br /><S.Text>점</S.Text></S.PlaceInfo>
                    <S.Score>
                      <S.Score1>30/40</S.Score1>
                      <S.Score2>20/40</S.Score2>
                      <S.Score3>30/40</S.Score3>
                    </S.Score>
                  </S.Content2>
                </S.Content>
              </S.PrintShopContainer>
            </S.ReportContainer>
            <S.HomeButton onClick={() => navigate("/")}>홈 화면으로 돌아가기</S.HomeButton>
        </S.Container2>
        </S.Container>
    );
}