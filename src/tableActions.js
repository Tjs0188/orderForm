import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[data-method="delete"]').forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const url = link.getAttribute("href");

      try {
        const response = await axios.delete(url);
        if (response.status === 200) {
          // Optionally, remove the row from the table or update the UI
          const row = link.closest("tr");
          if (row) {
            row.remove();
          }

          if (response.data.totalCount === 0) {
            // Optionally, show a message or update the UI
            document.querySelector("tbody").appendChild(createEmptyRow());
          }
        } else {
          console.error("Failed to delete:", response);
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    });
  });
});

const createEmptyRow = () => {
  const row = document.createElement("tr");
  row.classList.add("empty-row");
  const cell = document.createElement("td");
  cell.classList.add(
    "px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center".split()
  );
  cell.setAttribute("colspan", "3");
  cell.innerText = "No data found";
  row.appendChild(cell);
  return row;
};
