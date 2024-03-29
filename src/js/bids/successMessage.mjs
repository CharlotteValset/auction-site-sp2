import decor from "../../../images/decor.png";

/**
 * Displays a success message indicating that the bid is confirmed and removes it after a brief delay.
 *
 * @example
 * // Usage example:
 * successMessage();
 */
export const successMessage = () => {
  const successMessageContainer = document.querySelector("#successMessage");

  const successMessage = document.createElement("div");
  successMessage.className = "flex flex-col w-full mt-4";

  const successMessageText = document.createElement("p");
  successMessageText.className = "text-xl text-center mx-auto my-3";
  successMessageText.innerText = "Your bid is confirmed. Good Luck!";
  successMessage.appendChild(successMessageText);

  const successMessageDecor = document.createElement("img");
  successMessageDecor.src = decor;
  successMessageDecor.className = " mx-auto h-24 w-24 mb-3";
  successMessage.appendChild(successMessageDecor);

  // Append the success message to the container
  successMessageContainer.appendChild(successMessage);

  // Remove the success message after 3 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
};
