import GlobalStyle from "../styles/GlobalStyle.js";
import NavBarScore from "../components/OneqScore/NavBarScore.jsx";
import Score1 from "../components/OneqScore/FirstScoreSection.jsx";
import Score2 from "../components/OneqScore/SecondScoreSection.jsx";
import Score3 from "../components/OneqScore/ThirdScoreSection.jsx";
import Footer from "../components/Footer.jsx";

export default function ScorePage() {
    return (
        <main>
            <GlobalStyle />
            <NavBarScore/>
            <Score1 />
            <Score2 />
            <Score3 />
            <Footer />
        </main>
    );
}
