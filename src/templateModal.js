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

      HSOverlay.close(modalElement);

      const templateSelect = document.querySelector("#template-select");
      const option = document.createElement("option");
      option.value = response.data.template.id;
      option.text = response.data.template.name;
      templateSelect.appendChild(option);
      // Optionally, you can handle the response and update the UI accordingly
    } catch (error) {
      const nameInput = templateForm.querySelector("#name-input");
      const errorElement = document.createElement("p");

      nameInput.classList.add("border-rose-500");

      errorElement.innerText = error.response.data.error;
      errorElement.classList.add("text-sm", "text-rose-500");

      nameInput.insertAdjacentElement("afterend", errorElement);
      // Optionally, you can handle the error and update the UI accordingly
    }
  });
});
