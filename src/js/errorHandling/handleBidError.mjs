export const alertBidErrorMessage = document.querySelector(
  ".alert-Bid-Error-message",
);
// Function to handle bid errors based on status
export const handleBidError = (status) => {
  if (status === 400) {
    // Show alert for bid amount requirement
    alertBidErrorMessage.style.display = "block";
  } else {
    // Throw an error for other HTTP statuses
    throw new Error(`HTTP error! Status: ${status}`);
  }
};
