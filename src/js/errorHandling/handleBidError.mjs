const alertBidMessage = document.querySelector(".alert-Bid-message");
export const alertBidErrorMessage = document.querySelector(
  ".alert-Bid-Error-message",
);

/**
 * Handles errors that may occur during a bid submission based on the HTTP status code.
 *
 * @param {number} status - The HTTP status code received from the bid submission request.
 * @throws {Error} - Throws an error with a descriptive message for non-400 HTTP statuses.
 * @example
 * // Usage example:
 * const statusCode = 400;
 * handleBidError(statusCode);
 */
export const handleBidError = (status) => {
  if (status === 400) {
    // Show alert for bid amount requirement
    alertBidErrorMessage.style.display = "block";
    alertBidMessage.style.display = "none";
  } else {
    // Throw an error for other HTTP statuses
    throw new Error(`HTTP error! Status: ${status}`);
  }
};
