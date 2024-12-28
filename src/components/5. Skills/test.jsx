import React from "react";
import CircularMenu from "./tester.jsx"; // Assuming CircularMenu is in the same directory

import { CORE_SKILLS } from "./skills.js"; // Assuming this holds the menu data (colors, sizes, etc.)

function SkillBoard() {
  const menuProps = {
    colors: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"], //CORE_SKILLS.map((skill) => skill.color), // Extract colors from data
    radius: 50, // Adjust radius as needed
    paddingX: 0, // Adjust padding as needed
    paddingY: 0, // Adjust padding as needed
    scaleFactor: 300, // Adjust scale factor as needed
  };

  return (
    <>
      <CircularMenu {...menuProps} />
    </>
  );
}

export default SkillBoard;
