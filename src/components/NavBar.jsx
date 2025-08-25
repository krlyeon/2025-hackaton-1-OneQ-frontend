import SmalllogoImg from "../assets/oneq-small-logo.svg";
import N from "./NavBar.styles.js";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
      const navigate = useNavigate();
    
    return (
        <N.Header>
            <N.NavContainer>
                <N.SmallLogo src={SmalllogoImg} onClick={() => navigate("/") }/>
                <N.NavMenu>
                    <N.NavItem onClick={() => navigate("/")}>Home </N.NavItem>
                    <N.NavItem onClick={() => navigate("/printshopPage")}>인쇄소 등록</N.NavItem>
                    <N.NavItem><N.HighlightText onClick={() => navigate("/chose")}>견적 받기</N.HighlightText></N.NavItem>
                </N.NavMenu>
            </N.NavContainer>
        </N.Header>
    );
}