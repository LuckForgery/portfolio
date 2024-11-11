import React from "react";
import "./App.css";
import TopBar from "./components/TopBar.jsx";
import ProfileSlider from "./components/ProfileSlider.jsx";
import MainBlock from "./components/MainBlock.jsx";
import CVSection from "./components/CVSection.jsx";
import CoreExperiences from "./components/CoreExperiences.jsx";

function App() {
  return (
    <>
      <TopBar />
      <ProfileSlider />
      <MainBlock />
      <CVSection />
      {/*<CoreExperiences />*/}
    </>
  );
}

export default App;
