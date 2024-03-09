import { successMessage } from "./successMessage.mjs";
import { addBidToListingForm } from "./addBidToListing";

/**
 * Handles actions to be taken after a successful bid, including displaying a success message,
 * resetting the bid form, and reloading the window after a brief delay.
 *
 * @example
 * // Usage example:
 * handleSuccessfulBid();
 */
export const handleSuccessfulBid = () => {
  // Display success message
  successMessage();

  // Reset the form
  addBidToListingForm.reset();

  // Wait for 3 seconds before reloading the window
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};
