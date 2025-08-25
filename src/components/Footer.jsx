import FooterlogoImg from "../assets/footer-logo.svg";
import F from "./Footer.styles.js";

export default function Footer() {
    return (
        <F.Container>
            <F.CompanyInfoSection>
                <F.InfoTitle>주식회사 DE:V</F.InfoTitle>
                <F.InfoText>
                    대표자 <F.Highlight>손영채</F.Highlight><F.Space>사업자 등록번호 <F.Highlight>398-21-78362</F.Highlight></F.Space><br />
                    통신판매업신고번호 <F.Highlight>2025-해커톤-0825</F.Highlight><br />
                    개인정보정책관리자 <F.Highlight>김유미</F.Highlight><br />
                    주소 <F.Highlight>서울특별시 서초구 강남대로 27 aT센터</F.Highlight>
                </F.InfoText>
            </F.CompanyInfoSection>
            <F.LogoSection>
                <F.LogoImage src={FooterlogoImg} alt="ONEQ Logo" />
                <F.CopyrightText>Copyright © 2025 ONEQ All rights reserved.</F.CopyrightText>
            </F.LogoSection>
        </F.Container>
    );
}