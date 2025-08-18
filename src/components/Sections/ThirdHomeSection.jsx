import S from "../Sections/ThirdHomeSection.styles.js"; 
import RightCategoryCard1 from "../../assets/sticker.svg";
import LeftCategoryCard1 from "../../assets/businiss-card.svg";
import LeftCategoryCard2 from "../../assets/banner.svg";
import RightCategoryCard2 from "../../assets/poster.svg";
import RightCategoryCard3 from "../../assets/placard.svg";
import LeftCategoryCard3 from "../../assets/brochure.svg";
import LeftCategoryCard4 from "../../assets/book.svg";
import { useNavigate } from "react-router-dom";


export default function ThirdHomeSection() {

    const navigate = useNavigate();
  return (
    <S.Container>
        <S.LeftSection>
            <S.Title>
                모든 인쇄를 <br />
                누구나 AI와 함께 현실로
            </S.Title>
            <S.Subtitle>
                간단한 대화로 수십 개 인쇄소의 견적을 손쉽게 비교하세요.
            </S.Subtitle>
            <S.Button onClick={() => navigate("/chose")}>
                한 번에 견적 받기
            </S.Button>
        </S.LeftSection>

        <S.RightSection>
            <S.LeftCard>
                <S.CardImage src={LeftCategoryCard1} alt="CategoryCard 1"></S.CardImage>
                <S.CardImage src={LeftCategoryCard2} alt="CategoryCard 2"></S.CardImage>
                <S.CardImage src={LeftCategoryCard3} alt="CategoryCard 3"></S.CardImage>
            </S.LeftCard>  
            <S.RightCard>
                <S.CardImage src={RightCategoryCard1} alt="CategoryCard 4"></S.CardImage>
                <S.CardImage src={RightCategoryCard2} alt="CategoryCard 5"></S.CardImage>
                <S.CardImage src={RightCategoryCard3} alt="CategoryCard 6"></S.CardImage>
            </S.RightCard>
        </S.RightSection>
    </S.Container>
  );
}