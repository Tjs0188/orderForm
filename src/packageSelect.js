import axios from "axios";
import { deleteEmptyRows, updateTableData } from "./tableUtils.js";

export const initializePackageSelect = () => {
  const el = HSSelect.getInstance("#package-select");

  el.on("change", (val) => {
    axios.get(`/packages/packageItems?packageId=${val}`).then((response) => {
      const data = response.data.packageItems;

      if (data) {
        const table = document.querySelector("#packageItems-table");
        deleteEmptyRows(table);
        updateTableData(table, data);
      }
    });
  });
};
