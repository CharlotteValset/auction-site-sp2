import { successMessage } from "./successMessage.mjs";
import { addBidToListingForm } from "./addBidToListing";

// Function to handle successful bid
export const handleSuccessfulBid = () => {
  // Display success message
  successMessage();

  // Reset the form
  addBidToListingForm.reset();

  // Wait for 5 seconds before reloading the window
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};
