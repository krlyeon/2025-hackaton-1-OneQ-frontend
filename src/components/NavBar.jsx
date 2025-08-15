import SmalllogoImg from "../assets/oneq-small-logo.svg";
import N from "./NavBar.styles.js";

export default function NavBar() {
    return (
        <N.Header>
            <N.NavContainer>
                <N.SmallLogo src={SmalllogoImg} alt="ONEQ Logo" />
                <N.NavMenu>
                    <N.NavItem>Home</N.NavItem>
                    <N.NavItem>인쇄소 등록</N.NavItem>
                    <N.NavItem><N.HighlightText>견적 받기</N.HighlightText></N.NavItem>
                </N.NavMenu>
            </N.NavContainer>
        </N.Header>
    );
}