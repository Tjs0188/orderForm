import { deleteEventHandler } from "./tableActions.js";
export const inputClasses = [
  "py-2",
  "block",
  "w-full",
  "border-0",
  "border-transparent",
  "text-sm",
  "text-black",
  "focus:border-blue-500",
  "focus:ring-blue-500",
  "disabled:opacity-50",
  "disabled:pointer-events-none",
  "priority-input",
];

export const tableRowClasses = [
  "px-6",
  "py-4",
  "whitespace-nowrap",
  "text-sm",
  "font-medium",
  "text-black",
  "odd:bg-white",
  "even:bg-blue",
];

export const deleteActionClasses = [
  "flex",
  "justify-center",
  "px-2",
  "gap-2",
  "py-1",
  "rounded-lg",
  "border",
  "border-transparent",
  "text-rose-500",
  "decoration-2",
  "hover:text-blue-700",
  "hover:underline",
  "focus:underline",
  "focus:outline-none",
  "focus:text-blue-700",
  "disabled:opacity-50",
  "disabled:pointer-events-none",
];

export const deleteEmptyRows = (table) => {
  const emptyRow = table.querySelector(".empty-row");
  if (emptyRow) emptyRow.remove();
};

export const updateTableData = (table, data) => {
  const tbody = table.querySelector("tbody");
  updateTableTitle(
    "#package-items-title",
    `${data[0].package.name} - ${data[0].package.meta} -  Items`
  );

  deleteOldRows(tbody);
  addNewRows(tbody, data);
};

const deleteOldRows = (tbody) => {
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => row.remove());
};

const addNewRows = (tbody, data) => {
  data.forEach((pkgItem) => {
    const tr = document.createElement("tr");
    tr.classList.add(...tableRowClasses);

    tbody.appendChild(tr);
    const fieldMap = {
      priority: pkgItem.priority,
      category: pkgItem.item.category,
      product_number: pkgItem.item.product_number,
      description: pkgItem.item.description,
    };

    const fields = Object.keys(fieldMap);

    fields.forEach((field) => {
      const td = document.createElement("td");
      if (field === "priority") {
        const input = document.createElement("input");
        input.type = "number";
        input.value = fieldMap[field];
        input.dataset.packageItemId = pkgItem.id;

        input.classList.add(...inputClasses);
        td.appendChild(input);
      } else {
        td.textContent = fieldMap[field];
      }
      td.classList.add("px-6");
      tr.appendChild(td);
    });
  });
};

const updateTableTitle = (titleSelector, title) => {
  const tableTitle = document.querySelector(titleSelector);
  tableTitle.textContent = title;
};

export const generateDeleteAction = (url) => {
  // Create anchor and SVG elements
  const a = document.createElement("a");
  a.href = `${url}`; // Will be handled by event listener
  a.classList.add(...deleteActionClasses);
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

  a.addEventListener("click", deleteEventHandler);

  return a;
};
