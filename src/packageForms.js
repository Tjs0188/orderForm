document.addEventListener("DOMContentLoaded", () => {
  const el = HSSelect.getInstance("#package-select");

  el.on("change", (val) => {
    console.log(val);
  });
});
