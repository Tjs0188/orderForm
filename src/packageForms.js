import { initializePackageSelect } from "./packageSelect.js";
import { initializeAddItemButton } from "./addItemToPackage.js";
import {
  initializePackageCreate,
  initializePackageEdit,
} from "./packageForm.js";
import { initializeItemCreate, initializeItemEdit } from "./itemForm.js";

const initializeEnterKey = () => {
  const tables = document.querySelectorAll("#items-table, #packages-table");

  const inputs = Array.from(tables).flatMap((node) =>
    Array.from(node.querySelectorAll("input"))
  );

  inputs.forEach((element) => {
    element.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        var nextElement = document.querySelector(
          '[tabindex="' + (e.target.tabIndex + 1) + '"]'
        );

        if (nextElement) nextElement.focus();
        else document.querySelector('#items-table input[tabindex="1"]').focus();
      }
    });
  });
};

window.addEventListener("load", () => {
  initializePackageSelect();
  initializePackageCreate();
  initializePackageEdit();
  initializeItemCreate();
  initializeItemEdit();
  initializeAddItemButton();

  initializeEnterKey();
});
