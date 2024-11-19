function truncateString(str, num) {
  if (str.length > num) {
    console.log("Truncating string...");
    console.log("Original string: ", str);
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".truncate");
  elements.forEach((element) => {
    const truncateLength = element.dataset["truncatelength"] || 30;

    element.innerHTML = truncateString(element.innerHTML, truncateLength);
  });

  const tooltips = document.querySelectorAll(".hs-tooltip-content");
  tooltips.forEach((tooltip) => {
    const truncateLength = tooltip.dataset["truncatelength"] || 30;
    tooltip.innerHTML = tooltip.innerHTML
      .split("<br>")
      .map((line) => truncateString(line, truncateLength))
      .join("<br>");
  });
});
