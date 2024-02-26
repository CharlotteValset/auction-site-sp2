// Imports
import { handleBidError } from "./handleBidError.mjs";
import { handleSuccessfulBid } from "./handleSuccessfulBid.mjs";
import { showAlert } from "../utils/showAlert.mjs";
import { makeBid } from "./makeBid.mjs";

// Selecting the form element
export const addBidToListingForm = document.querySelector("#addBid");

// Event handler for form submission
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
    showAlert("Please add an amount to the input field");
    return;
  }

  try {
    // Send a POST request to make a bid to the listing
    const response = await makeBid(userToken, { amount: amountNum });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Handle successful bid
      handleSuccessfulBid();
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
