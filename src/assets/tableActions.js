import axios from "axios";

const initializeTableActions = () => {
  document.querySelectorAll("table").forEach((table) => {
    const deleteLinks = table.querySelectorAll('a[data-method="delete"]');

    // Use event delegation on parent element
    deleteLinks.forEach((link) => {
      link.addEventListener("click", deleteEventHandler);
    });
    updateSortIcons(
      table,
      JSON.parse(table.getAttribute("data-sort-order") || "[]")
    );
  });
};

export const deleteEventHandler = async (event) => {
  event.preventDefault();
  const deleteLink = event.target.closest("a") || event.target;

  const url = deleteLink.getAttribute("href");
  const confirmDelete = confirm("Are you sure you want to delete?");
  console.log(deleteLink);
  if (!confirmDelete) {
    return;
  }

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

// Function to filter table rows
function filterTable(event) {
  const table = event.target.closest("table");
  const rows = table.querySelectorAll("tbody tr");
  const filters = Array.from(table.querySelectorAll("thead input")).reduce(
    (acc, input) => {
      if (input.value) {
        acc[input.getAttribute("name")] = input.value.toLowerCase();
      }
      return acc;
    },
    {}
  );

  rows.forEach((row) => {
    let isVisible = true;
    for (const [columnKey, filterValue] of Object.entries(filters)) {
      const cell = row.querySelector(`td[data-key="${columnKey}"]`);
      if (cell) {
        const cellValue = cell.textContent.toLowerCase();
        if (!cellValue.includes(filterValue)) {
          isVisible = false;
          break;
        }
      }
    }
    row.style.display = isVisible ? "" : "none";
  });
}

// Function to clear all filters
function clearFilters(tableSelector) {
  console.log(tableSelector);
  const table = document.querySelector(tableSelector);
  const filterInputs = table.querySelectorAll("thead input");
  filterInputs.forEach((input) => (input.value = ""));
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => (row.style.display = ""));
}

function sortTable(tableSelector, columnKey) {
  const table = document.querySelector(`${tableSelector}`);
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const sortOrder = table.getAttribute("data-sort-order") || "[]";
  const sortOrderArray = JSON.parse(sortOrder);

  const existingSortIndex = sortOrderArray.findIndex(
    (sort) => sort.columnKey === columnKey
  );

  if (existingSortIndex !== -1) {
    if (sortOrderArray[existingSortIndex].order === "asc") {
      sortOrderArray[existingSortIndex].order = "desc";
    } else {
      sortOrderArray.splice(existingSortIndex, 1); // Remove sort order if already "desc"
    }
  } else {
    sortOrderArray.push({ columnKey, order: "asc" });
  }

  rows.sort((a, b) => {
    for (const sort of sortOrderArray) {
      const aValue = a
        .querySelector(`td[data-key="${sort.columnKey}"]`)
        .textContent.trim()
        .toLowerCase();
      const bValue = b
        .querySelector(`td[data-key="${sort.columnKey}"]`)
        .textContent.trim()
        .toLowerCase();

      if (aValue !== bValue) {
        return sort.order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  rows.forEach((row) => table.querySelector("tbody").appendChild(row));
  table.setAttribute("data-sort-order", JSON.stringify(sortOrderArray));

  updateSortIcons(table, sortOrderArray);
}

// Function to update sort icons
function updateSortIcons(table, sortOrderArray) {
  const headers = table.querySelectorAll("span[data-key]");
  headers.forEach((header) => {
    const columnKey = header.getAttribute("data-key");
    const sort = sortOrderArray.find((sort) => sort.columnKey === columnKey);
    const icon = header.querySelector(".sort-icon");

    if (sort) {
      icon.textContent = sort.order === "asc" ? "▲" : "▼";
    } else {
      icon.textContent = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.tableActionsInitialized) {
    return;
  }
  initializeTableActions();
  window.tableActionsInitialized = true;
});

// Ensure the functions are accessible globally
window.filterTable = filterTable;
window.sortTable = sortTable;
window.clearFilters = clearFilters;
