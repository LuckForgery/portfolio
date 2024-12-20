import React from "react";
import "./App.css";
import TopBar from "./components/1. TopBar/TopBar.jsx";
import ProfileSlider from "./components/2. MainProfile/ProfileSlider.jsx";
import MainBlock from "./components/2. MainProfile/MainBlock.jsx";
import CVSection from "./components/3. CV/CVSection.jsx";
import CoreExperiences from "./components/4. WorkExperience/CoreExperiences.jsx";
import CoreSkills from "./components/5. Skills/CoreSkills.jsx";
import Solutions from "./components/6. Solutions/Solutions.jsx";

function App() {
  return (
    <>
      <TopBar />
      <ProfileSlider />
      <MainBlock />
      <CVSection />
      <CoreExperiences />
      <CoreSkills />
      <Solutions />
    </>
  );
}

export default App;
