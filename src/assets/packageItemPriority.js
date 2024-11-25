import axios from "axios";

export const initializePriorityChange = () => {
  const els = document.querySelectorAll(".priority-input");
  const table = document.querySelector("#packageItems-table");
  const tbody = table.querySelector("tbody");

  if (!els) return;
  els.forEach((el) => {
    el.addEventListener("change", (e) => {
      const packageItemId = e.target.dataset.packageItemId;
      const priority = e.target.value;

      axios
        .put(`/packages/packageItems/${packageItemId}`, { priority })
        .then(() => {
          sortTableRowsByPriority(tbody);
        });
    });
  });
};

const sortTableRowsByPriority = (tbody) => {
  const rows = Array.from(tbody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const aPriority = parseInt(
      a.querySelector("input[type='number']").value,
      10
    );
    const bPriority = parseInt(
      b.querySelector("input[type='number']").value,
      10
    );
    return aPriority - bPriority;
  });

  rows.forEach((row) => tbody.appendChild(row));
};
