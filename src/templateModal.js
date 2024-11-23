import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const mainForm = document.getElementById("orderForm");
  const templateForm = document.getElementById("templateModalForm");
  const modalElement = document.querySelector("#templateModal");

  templateForm.addEventListener("submit", async (event) => {
    // Prevent the default form submission
    event.preventDefault();
    // Copy values from mainForm to templateForm as hidden fields
    const fieldsToCopy = [
      "contactName",
      "deliveryPhone",
      "contactEmail",
      "requestDeliveryDate",
      "address",
      "lotBlock",
      "city",
      "state",
      "zip",
      "projectName",
      "accountNumber",
      "quoteNumber",
    ]; // Add the IDs of the fields you want to copy
    const formData = new FormData(templateForm);

    fieldsToCopy.forEach((fieldId) => {
      const mainField = mainForm.querySelector(`#${fieldId}-input`);
      if (mainField) {
        formData.append(mainField.name, mainField.value);
      }
    });

    try {
      // Send the form data using Axios
      const response = await axios.post("/orderform/saveTemplate", formData);
      const successClasses = [
        "border-green-400",
        "text-green-400",
        "animate-pulse",
      ];
      HSOverlay.close(modalElement);

      const templateSelect = document.getElementById("template-select");

      const option = document.createElement("option");
      option.value = response.data.template.id;
      option.text = response.data.template.name;
      templateSelect.classList.add(...successClasses);
      templateSelect.appendChild(option);
      const noTemplates = templateSelect.querySelector(".no-templates");
      if (noTemplates) {
        noTemplates.remove();
      }

      setTimeout(() => {
        templateSelect.classList.remove(...successClasses);
      }, 5000);

      // Optionally, you can handle the response and update the UI accordingly
    } catch (error) {
      console.log(error);
      const nameInput = templateForm.querySelector("#name-input");
      const errorElement = document.querySelector("#template_name_error");
      nameInput.classList.add("border-rose-500");
      errorElement.classList.remove("hidden");
      errorElement.innerText = error.response.data.error;
      errorElement.classList.add("text-sm", "text-rose-500");
      setTimeout(() => {
        nameInput.classList.remove("border-rose-500");
        errorElement.classList.add("hidden");
      }, 4000);
      // Optionally, you can handle the error and update the UI accordingly
    }
  });
});
