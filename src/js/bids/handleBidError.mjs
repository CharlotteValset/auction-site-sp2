import { showAlert } from "../utils/showAlert.mjs";

// Function to handle bid errors based on status
export const handleBidError = (status) => {
  if (status === 400) {
    // Show alert for bid amount requirement
    showAlert("Bid amount must be higher than highest bid");
  } else {
    // Throw an error for other HTTP statuses
    throw new Error(`HTTP error! Status: ${status}`);
  }
};
