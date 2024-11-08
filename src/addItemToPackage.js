export const initializeAddItemButton = () => {
  const el = document.querySelector("#add-package-item-button");
  const pkgSelect = HSSelect.getInstance("#package-select");
  const itemSelect = HSSelect.getInstance("#item-select");

  el.addEventListener("click", () => {
    console.log(pkgSelect.value);
    console.log(itemSelect.value);
    console.log("add package item button clicked");
  });
};
