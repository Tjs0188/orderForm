import axios from "axios";
import { handleErrorMessage, handleSuccessMessage } from "./messageHandlers.js";
import { deleteEmptyRows, tableRowClasses } from "./tableUtils.js";

export const initializeItemEdit = () => {
  const productNumberEls = document.querySelectorAll("[name=product_number]");
  const descriptionEls = document.querySelectorAll("[name=description]");
  productNumberEls.forEach((el) => {
    el.addEventListener("focusout", updateItem.bind(null, el));
  });

  descriptionEls.forEach((el) => {
    el.addEventListener("focusout", updateItem.bind(null, el));
  });
};

const updateItem = (el) => {
  const errorMessageContainer = document.querySelector(
    "#edit-item-error-message"
  );
  const successMessageContainer = document.querySelector(
    "#edit-item-success-message"
  );
  const id = el.attributes["rowid"].value;
  axios
    .put(`/packages/items/${id}`, { [el.name]: el.value })
    .then((response) => {
      // Highlight the updated row
      el.classList.add("bg-green-200");
      el.value = response.data[el.name];

      // Handle success message
      handleSuccessMessage(
        successMessageContainer,
        "Item updated successfully."
      );

      setTimeout(() => {
        el.classList.remove("bg-green-200");
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      handleErrorMessage(errorMessageContainer, successMessageContainer, error);
    });
};

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
  tr.classList.add(...tableRowClasses);

  const fieldMap = {
    id: newItem.id,
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

  const td = document.createElement("td");
  const deleteAction = generateDeleteAction(newItem.id);
  td.appendChild(deleteAction);
  td.classList.add("px-6");
  tr.appendChild(td);

  tbody.appendChild(tr);

  return tr;
};

const generateDeleteAction = (id) => {
  // Create anchor and SVG elements
  const a = document.createElement("a");
  a.href = `#`; // Will be handled by event listener
  a.classList.add(
    "flex",
    "px-2",
    "gap-2",
    "py-1",
    "rounded-lg",
    "border",
    "border-transparent",
    "text-rose-600",
    "decoration-2",
    "hover:text-blue-700",
    "hover:underline",
    "focus:underline",
    "focus:outline-none",
    "focus:text-blue-700",
    "disabled:opacity-50",
    "disabled:pointer-events-none"
  );
  a.setAttribute("data-method", "delete");
  a.textContent = "Delete";

  // Create SVG icon
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "shrink-0 size-4 self-center");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "m9 18 6-6-6-6");
  svg.appendChild(path);

  // Add to container
  a.appendChild(svg);

  return a;
};
