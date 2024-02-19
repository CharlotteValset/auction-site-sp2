/**
 * Creates an HTML message element.
 * @param {string} [type="error"] The type of the message.
 * @param {string} [message="Ooops! An error has occurred."] The message content.
 * @returns {string} - The generated HTML message string.
 * @example
 * const errorMessage = createMessage("error", "This is an error message.");
 * document.body.innerHTML = errorMessage;
 */
export const createMessage = (
  type = "error",
  message = "Ooops! An error has occurred.",
) => {
  // Construct the HTML message element with specified type and message
  const html = `<div class="message" ${type}">${message}</div>`;

  // Return the generated HTML message string
  return html;
};
