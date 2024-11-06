import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const mainForm = document.getElementById("orderForm");
  const templateForm = document.getElementById("templateModalForm");
  const modal = new HSOverlay(document.querySelector("#templateModal"));

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
      console.log("Template saved successfully:", response.data);
      modal.close();
      // Optionally, you can handle the response and update the UI accordingly
    } catch (error) {
      console.error("Error saving template:", error);
      // Optionally, you can handle the error and update the UI accordingly
    }
  });
});
