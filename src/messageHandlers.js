export const handleSuccessMessage = (successMessageContainer, message) => {
  successMessageContainer.classList.remove("hidden");
  successMessageContainer.textContent = message;

  // Hide the success message after 5 seconds with a fade-out effect
  setTimeout(() => {
    successMessageContainer.classList.add(
      "transition-opacity",
      "duration-1000",
      "ease-in-out",
      "opacity-0"
    );
    setTimeout(() => {
      successMessageContainer.classList.add("hidden");
    }, 300); // Match this duration with the transition duration
  }, 3000);
};

export const handleErrorMessage = (
  errorMessageContainer,
  successMessageContainer,
  error
) => {
  // Display the error message
  errorMessageContainer.classList.remove("hidden");
  successMessageContainer.classList.add("hidden");
  errorMessageContainer.classList.remove("opacity-0");
  errorMessageContainer.classList.add("opacity-100");
  errorMessageContainer.textContent =
    error.response.data.message || "An error occurred. Please try again.";

  // Hide the error message after 5 seconds with a fade-out effect
  setTimeout(() => {
    errorMessageContainer.classList.add(
      "transition-opacity",
      "duration-1000",
      "ease-in-out",
      "opacity-0"
    );
    setTimeout(() => {
      errorMessageContainer.classList.add("hidden");
    }, 300); // Match this duration with the transition duration
  }, 3000);
};
