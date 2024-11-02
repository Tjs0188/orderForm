document.addEventListener("DOMContentLoaded", () => {
  const pkgSelect = document.querySelector("#addPackageSelect");
  const frgSelect = document.querySelector("#addFridgeSelect");
  const wdSelect = document.querySelector("#addWDSelect");

  const packageTable = document.querySelector("#packageTable");

  // Create dedicated sections for each group of items
  const packageItemsSection = createTableSection("packageItemsSection");
  const fridgeItemsSection = createTableSection("fridgeItemsSection");
  const wdItemsSection = createTableSection("wdItemsSection");

  function createTableSection(className) {
    const section = document.createElement("tbody");
    const tableBodyClassess = ["divide-y", "divide-gray-200", className];
    section.classList.add(...tableBodyClassess);
    packageTable.appendChild(section);
    return section;
  }

  // General function to fetch data and update a section
  async function updateTableSection(
    selectElement,
    section,
    itemClass,
    hiddenField
  ) {
    const selectedOption = selectElement[selectElement.selectedIndex];
    const packageItems = await axios.get("/orderform/packageItems", {
      params: { packageId: selectedOption.value },
    });

    // Clear existing items in the section
    clearSection(section);

    // Add new items to the section
    const itemsArray = Object.entries(packageItems.data.packageItems).map(
      (pkgItem) => {
        const item = pkgItem[1].item;
        const tableRow = createEditableTableRow(item, itemClass);
        section.appendChild(tableRow);
        return item; // Collect item data for the hidden field
      }
    );

    // Store the serialized data in the hidden field
    hiddenField.value = JSON.stringify(itemsArray);
  }

  function clearSection(section) {
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  }

  function createEditableTableRow(item, itemClass) {
    const tableRow = document.createElement("tr");
    const tableRowClasses = [
      "px-6",
      "py-4",
      "whitespace-nowrap",
      "text-sm",
      "font-medium",
      "text-gray-800",
      itemClass,
    ];
    const inputClasses = [
      "py-2",
      "px-2",
      "block",
      "w-full",
      "border",
      "rounded-lg",
      "text-sm",
      "focus:border-blue-500",
      "focus:ring-blue-500",
      "disabled:opacity-50",
      "disabled:pointer-events-none",
      "editable-field",
    ];
    tableRow.classList.add(...tableRowClasses);

    const category = document.createElement("td");
    const productNumber = document.createElement("td");
    const description = document.createElement("td");

    // Create editable inputs for each property
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.value = item.category;
    categoryInput.name = `${itemClass}[category][]`;
    categoryInput.classList.add(...inputClasses);

    const productNumberInput = document.createElement("input");
    productNumberInput.type = "text";
    productNumberInput.value = item.product_number;
    productNumberInput.name = `${itemClass}[product_number][]`;
    productNumberInput.classList.add(...inputClasses);

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = item.description;
    descriptionInput.name = `${itemClass}[description][]`;
    descriptionInput.classList.add(...inputClasses);

    // Append inputs to table cells
    category.appendChild(categoryInput);
    productNumber.appendChild(productNumberInput);
    description.appendChild(descriptionInput);

    tableRow.appendChild(category);
    tableRow.appendChild(productNumber);
    tableRow.appendChild(description);

    return tableRow;
  }

  // Event listeners for each select element
  pkgSelect.addEventListener("change", () => {
    updateTableSection(
      pkgSelect,
      packageItemsSection,
      "packageItem",
      document.querySelector("#packageItemsData")
    );
  });

  frgSelect.addEventListener("change", () => {
    updateTableSection(
      frgSelect,
      fridgeItemsSection,
      "frgItem",
      document.querySelector("#fridgeItemsData")
    );
  });

  wdSelect.addEventListener("change", () => {
    updateTableSection(
      wdSelect,
      wdItemsSection,
      "wdItem",
      document.querySelector("#wdItemsData")
    );
  });
});
