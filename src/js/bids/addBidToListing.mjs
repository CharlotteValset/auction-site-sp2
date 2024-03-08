// Imports
import {
  handleBidError,
  alertBidErrorMessage,
} from "../errorHandling/handleBidError.mjs";
import { handleSuccessfulBid } from "./handleSuccessfulBid.mjs";
import { makeBid } from "./makeBid.mjs";

export const addBidToListingForm = document.querySelector("#addBid");
const alertBidMessage = document.querySelector(".alert-Bid-message");

/**
 * Handles the form submission event, adds a bid to the listing, and displays appropriate alerts.
 *
 * @param {Event} event - The form submission event.
 * @example
 * // Attach this function to the bid form's submit event
 * addBidToListingForm.addEventListener("submit", addBidToListing);
 */
export const addBidToListing = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the user token from localStorage
  const userToken = localStorage.getItem("accessToken");

  // Get the bid amount from the form input
  const bidAmount = event.target.querySelector("#bidAmount");
  const amountNum = Number(bidAmount.value);

  // Check if the bid amount is provided
  if (!amountNum) {
    // Display an alert if the required field is not filled
    alertBidMessage.style.display = "block";
    alertBidErrorMessage.style.display = "none";
    return;
  }

  try {
    // Send a POST request to make a bid to the listing
    const response = await makeBid(userToken, { amount: amountNum });

    // Check if the request was successful
    if (response.ok) {
      // Handle successful bid
      handleSuccessfulBid();
      alertBidMessage.style.display = "none";
      alertBidErrorMessage.style.display = "none";
    } else {
      // Handle bid errors based on status
      handleBidError(response.status);
    }
  } catch (error) {
    // Log the detailed error message
    console.error("Error adding bid:", error.message);

    // Rethrow the error if needed
    throw error;
  }
};
