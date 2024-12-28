import { useLayoutEffect, useRef } from "react";

function HandleSkills() {
  const isInitialized = useRef(false);

  useLayoutEffect(() => {
    if (!isInitialized.current) {
      const table = document.getElementById("dynamicTable");
      if (table) {
        const tbody = table.getElementsByTagName("tbody")[0];
        let counter = 1;
        const rowLengths = [3, 4, 5, 4, 3];

        for (let i = 0; i < rowLengths.length; i++) {
          const row = tbody.insertRow();
          const wrapper = document.createElement("div");
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "center";
          wrapper.style.width = "100%";

          for (let j = 0; j < rowLengths[i]; j++) {
            const cell = row.insertCell();
            cell.textContent = counter++;
            wrapper.appendChild(cell);
          }
          row.appendChild(wrapper);
        }
      } else {
        console.error("Table with ID 'dynamicTable' not found!");
      }
      isInitialized.current = true;
    }
  }, []);
}

export default HandleSkills;
