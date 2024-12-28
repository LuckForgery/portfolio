import { CORE_SKILLS } from "./skills.js";
import { useLayoutEffect, useRef } from "react";

function HandleSkills() {
  const isInitialized = useRef(false);

  useLayoutEffect(() => {
    if (!isInitialized.current) {
      const table = document.getElementById("dynamicTable");
      const tbody = table.getElementsByTagName("tbody")[0];
      const rowLengths = [3, 4, 5, 4, 3];

      let skillIndex = 0;

      for (let i = 0; i < rowLengths.length; i++) {
        const row = tbody.insertRow();
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";
        wrapper.style.width = "100%";

        for (let j = 0; j < rowLengths[i]; j++) {
          const cell = row.insertCell();

          if (skillIndex < CORE_SKILLS.length) {
            const img = document.createElement("img");
            img.src = CORE_SKILLS[skillIndex].image;
            img.alt = CORE_SKILLS[skillIndex].title;
            img.style.maxWidth = "30px";
            img.style.maxHeight = "30px";
            cell.appendChild(img);
          }
          cell.style.marginLeft = "5%";
          cell.style.marginRight = "5%";
          cell.style.marginTop = "-5px";
          cell.style.marginBottom = "-5px";
          cell.style.backgroundColor = "GREY";
          cell.style.borderRadius = "50px";
          wrapper.appendChild(cell);
          skillIndex++;
        }
        row.appendChild(wrapper);
      }
      isInitialized.current = true;
    }
  }, []);

  return null;
}

export default HandleSkills;
