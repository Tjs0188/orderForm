import axios from "axios";
const initializeTableActions = () => {
  const deleteLinks = document.querySelectorAll('a[data-method="delete"]');

  // Use event delegation on parent element
  deleteLinks.forEach((link) => {
    link.addEventListener("click", deleteEventHandler);
  });
};

const deleteEventHandler = async (event) => {
  event.preventDefault();
  const deleteLink = event.target;
  const url = deleteLink.getAttribute("href");

  try {
    const response = await axios.delete(url);
    if (response.status === 200) {
      const row = deleteLink.closest("tr");
      if (row) {
        row.remove();
      }

      if (response.data.totalCount === 0) {
        document.querySelector("tbody").appendChild(createEmptyRow());
      }
    } else {
      console.error("Failed to delete:", response);
    }
  } catch (error) {
    console.error("Error deleting:", error);
  }
};

const createEmptyRow = () => {
  const row = document.createElement("tr");
  row.classList.add("empty-row");
  const cell = document.createElement("td");
  cell.classList.add(
    "px-6",
    "py-4",
    "whitespace-nowrap",
    "text-lg",
    "font-medium",
    "text-gray-500",
    "text-center"
  );
  cell.setAttribute("colspan", "3");
  cell.innerText = "No data found";
  row.appendChild(cell);
  return row;
};

document.addEventListener("DOMContentLoaded", initializeTableActions);
