import { apiBaseUrl, allListingsUrl } from "../variables.mjs";
import { successMessage } from "./successMessage.mjs";

export const addBidToListingForm = document.querySelector("#addBid");

// Extracting the post ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export const addBidToListing = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the user token from localStorage
  const userToken = localStorage.getItem("accessToken");

  // Get values from the form input
  const bidAmount = event.target.querySelector("#bidAmount");

  const amountNum = Number(bidAmount.value);

  // Construct the data object which is to be sent to the API
  let dataObj = {
    amount: amountNum,
  };

  if (!amountNum) {
    // Display an alert if required fields are not filled
    alert("Please add an amount to input field");
    return;
  }

  try {
    // Send a POST request to make a bid to listing
    const response = await fetch(
      `${apiBaseUrl}${allListingsUrl}/${id}/bids?_bids=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(dataObj),
      },
    );
    console.log(response);
    // Check if the request was successful
    if (response.errors) {
      // Throw an error if the request was not successful
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      successMessage();

      event.target.reset();

      // Wait for 5 seconds before reloading the window
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    // Reset the form after successful post creation
  } catch (error) {
    // Log the detailed error message
    console.error("Error adding bid:", error.message);

    // Rethrow the error if needed
    throw error;
  }
};

// Add an event listener to the form for the submit event
addBidToListingForm.addEventListener("submit", addBidToListing);
