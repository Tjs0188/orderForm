import { initializePackageSelect } from "./packageSelect.js";
import { initializeAddItemButton } from "./addItemToPackage.js";

window.addEventListener("load", () => {
  initializePackageSelect();

  initializeAddItemButton();
});
