import axios from "axios";
import { handleErrorMessage, handleSuccessMessage } from "./messageHandlers.js";
import { deleteEmptyRows } from "./tableUtils.js";

export const initializePackageCreate = () => {
  const el = document.querySelector("#create-package-button");
  const table = document.querySelector("#packages-table");
  const errorMessageContainer = document.querySelector(
    "#add-package-error-message"
  );
  const successMessageContainer = document.querySelector(
    "#add-package-success-message"
  );
  el.addEventListener("click", () => {
    const form = document.querySelector("#package-form");
    const formData = new FormData(form);

    axios
      .post("/packages", formData)
      .then((response) => {
        console.log(response);
        // Update the table with the new item
        const newItem = response.data;
        const tbody = table.querySelector("tbody");
        deleteEmptyRows(table);

        const newRow = addNewRow(tbody, newItem);

        // Highlight the new row
        newRow.classList.add("bg-blue-200");
        newRow.scrollIntoView({ behavior: "smooth", block: "center" });
        // Handle success message
        handleSuccessMessage(
          successMessageContainer,
          "Package added successfully."
        );

        setTimeout(() => {
          newRow.classList.remove("bg-blue-200");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        handleErrorMessage(
          errorMessageContainer,
          successMessageContainer,
          error
        );
      });
  });
};

const addNewRow = (tbody, newItem) => {
  const tr = document.createElement("tr");
  const tableRowClasses = [
    "px-6",
    "py-4",
    "whitespace-nowrap",
    "text-sm",
    "font-medium",
    "text-gray-800",
    "odd:bg-white",
    "even:bg-blue",
  ];
  tr.classList.add(...tableRowClasses);

  const fieldMap = {
    name: newItem.name,
    meta: newItem.meta,
    category: newItem.category,
  };

  const fields = Object.keys(fieldMap);

  fields.forEach((field) => {
    const td = document.createElement("td");
    td.textContent = fieldMap[field];
    td.classList.add("px-6");
    tr.appendChild(td);
  });

  tbody.appendChild(tr);

  return tr;
};
