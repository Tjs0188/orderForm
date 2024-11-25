import axios from "axios";
import {
  deleteEmptyRows,
  tableRowClasses,
  inputClasses,
} from "./tableUtils.js";
import { handleErrorMessage, handleSuccessMessage } from "./messageHandlers.js";

export const initializeAddItemButton = () => {
  const el = document.querySelector("#add-package-item-button");
  const pkgSelect = HSSelect.getInstance("#package-select");
  const itemSelect = HSSelect.getInstance("#item-select");
  const priorityInput = document.querySelector("#priority-input");
  const errorMessageContainer = document.querySelector(
    "#add-package-item-error-message"
  );
  const successMessageContainer = document.querySelector(
    "#add-package-item-success-message"
  );
  const packageTable = document.querySelector("#packageItems-table");

  el.addEventListener("click", () => {
    axios
      .post("/packages/addItem", {
        package_id: pkgSelect.value,
        item_id: itemSelect.value,
        priority: priorityInput.value,
      })
      .then((response) => {
        console.log(response);
        // Hide the error message container if the request is successful
        errorMessageContainer.classList.add("hidden");

        // Update the table with the new item
        const newItem = response.data;
        const tbody = packageTable.querySelector("tbody");
        deleteEmptyRows(packageTable);
        const newRow = addNewRow(tbody, newItem);

        // Sort the rows by priority
        sortTableRowsByPriority(tbody);

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

  tr.classList.add(...tableRowClasses);

  const fieldMap = {
    priority: newItem.priority,
    category: newItem.item.category,
    product_number: newItem.item.product_number,
    description: newItem.item.description,
  };

  const fields = Object.keys(fieldMap);

  fields.forEach((field) => {
    const td = document.createElement("td");
    if (field === "priority") {
      const input = document.createElement("input");
      input.type = "number";
      input.value = fieldMap[field];

      input.classList.add(...inputClasses);
      td.appendChild(input);
    } else {
      td.textContent = fieldMap[field];
    }
    td.classList.add("px-6");
    tr.appendChild(td);
  });

  tbody.appendChild(tr);

  return tr;
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
