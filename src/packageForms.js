import { initializePackageSelect } from "./packageSelect.js";
import { initializeAddItemButton } from "./addItemToPackage.js";
import { initializePackageCreate } from "./packageForm.js";
import { initializeItemCreate } from "./itemForm.js";

window.addEventListener("load", () => {
  initializePackageSelect();
  initializePackageCreate();
  initializeItemCreate();
  initializeAddItemButton();
});
