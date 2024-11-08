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
        const inputClasses = [
          "py-2",
          "block",
          "w-full",
          "border-0",
          "border-transparent",
          "text-sm",
          "focus:border-blue-500",
          "focus:ring-blue-500",
          "disabled:opacity-50",
          "disabled:pointer-events-none",
        ];
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
