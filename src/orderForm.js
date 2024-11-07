import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  initializePackagesTable();

  initializeTemplateApplicator();
});

const initializePackagesTable = () => {
  const pkgSelect = document.querySelector("#addPackage-select");
  const frgSelect = document.querySelector("#addFridge-select");
  const wdSelect = document.querySelector("#addWD-select");

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
    const packageItems = await axios.get("/packages/packageItems", {
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
    if (hiddenField) {
      hiddenField.value = JSON.stringify(itemsArray);
    }
  }

  function clearSection(section) {
    const emptyRow = document.querySelector(".empty-row");
    if (emptyRow) {
      emptyRow.remove();
    }

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
      "odd:bg-white",
      "even:bg-blue",
      itemClass,
    ];
    const inputClasses = [
      "py-2",
      "px-2",
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
};

const initializeTemplateApplicator = () => {
  const templateSelect = document.querySelector("#template-select");
  const applyTemplateButton = document.querySelector("#applyTemplateButton");

  applyTemplateButton.addEventListener("click", async () => {
    const selectedOption = templateSelect[templateSelect.selectedIndex];
    const templateId = selectedOption.value;
    const response = await axios.get("/orderform/template", {
      params: { templateId },
    });

    const template = response.data.template;

    // Mapping of response keys to form field IDs
    const fieldMapping = {
      contact_name: "contactName",
      delivery_phone: "deliveryPhone",
      contact_email: "contactEmail",
      deliv_date: "requestDeliveryDate",
      address: "address",
      lot_block: "lotBlock",
      city: "city",
      state: "state",
      zip: "zip",
      proj_name: "projectName",
      acc_num: "accountNumber",
      quote_num: "quoteNumber",
    };

    // Update the form fields with the values from the response
    Object.keys(fieldMapping).forEach((key) => {
      const fieldId = fieldMapping[key];
      const field = document.querySelector(`#${fieldId}-input`);
      if (field) {
        field.value = template[key] || "";
      }
    });
  });
};
