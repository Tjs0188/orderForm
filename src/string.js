function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".truncate");
  elements.forEach((element) => {
    const truncateLength = element.dataset["truncatelength"] || 30;
    console.log("truncateLength", truncateLength);
    element.innerHTML = truncateString(element.innerHTML, truncateLength);
  });
});
