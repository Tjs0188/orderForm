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
        } else {
          console.error("Failed to delete:", response);
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    });
  });
});
