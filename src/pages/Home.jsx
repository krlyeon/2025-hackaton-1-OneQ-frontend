// src/pages/Home.jsx
import NavBar from '../components/NavBar.jsx';
import FirstHomeSection from '../components/Sections/FirstHomeSection.jsx';
import SecondHomeSection from '../components/Sections/SecondHomeSection.jsx';
import ThirdHomeSection from '../components/Sections/ThirdHomeSection.jsx';

export default function Home() {
    return (
        <main>
        <NavBar/>   
        <FirstHomeSection />
        <SecondHomeSection />
        <ThirdHomeSection />
        </main>
    );
}