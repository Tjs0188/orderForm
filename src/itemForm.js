import axios from "axios";
import { handleErrorMessage, handleSuccessMessage } from "./messageHandlers.js";
import { deleteEmptyRows } from "./tableUtils.js";

export const initializeItemCreate = () => {
  const el = document.querySelector("#create-item-button");
  const table = document.querySelector("#items-table");
  const errorMessageContainer = document.querySelector(
    "#add-item-error-message"
  );
  const successMessageContainer = document.querySelector(
    "#add-item-success-message"
  );
  el.addEventListener("click", () => {
    const form = document.querySelector("#item-form");
    const formData = new FormData(form);

    axios
      .post("/packages/items", formData)
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
          "Item added successfully."
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
    category: newItem.category,
    product_number: newItem.product_number,
    description: newItem.description,
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