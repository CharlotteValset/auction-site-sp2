//Imports
import { apiBaseUrl, allListingsUrl } from "../variables.mjs";

// Get the form element for creating a new listing
export const createListingForm = document.querySelector("#new-listing");

/**
 * Handles the form submission to create a new listing.
 *
 * @param {Event} event - The form submission event.
 * @throws {Error} - Throws an error with a detailed message if an issue occurs during the listing creation process.
 * @example
 * // Usage example:
 * const listingForm = document.getElementById("listing-form");
 * listingForm.addEventListener("submit", createListing);
 */
export const createListing = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Select alert message elements
  const alertMessage = document.querySelector(".alert-message");
  const alertErrorMessage = document.querySelector(".alert-error-message");
  const alertSuccessMessage = document.querySelector(".success-message");

  // Retrieve the user token from localStorage
  const userToken = localStorage.getItem("accessToken");

  // Get values from the form inputs
  const title = event.target.querySelector("#new-listing-Title").value;
  const description = event.target.querySelector(
    "#new-listing-description",
  ).value;
  const mediaInput = event.target.querySelectorAll(".addImage");
  const bidDeadlineDate =
    event.target.querySelector("#bid-deadline-date").value;

  // Check if required fields are filled
  if (!title || !mediaInput || !bidDeadlineDate) {
    // Display an alert if required fields are not filled
    alertMessage.style.display = "block";
    return;
  }

  // Collect media URLs from the input fields
  const media = [];

  mediaInput.forEach(function (input) {
    if (input.value) {
      media.push(input.value);
    }
  });

  // Create a new listing object with the collected data
  const newListing = {
    title: title,
    description: description,
    media: media,
    endsAt: bidDeadlineDate,
  };

  try {
    // Send a POST request to create a new listing
    const response = await fetch(`${apiBaseUrl}${allListingsUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newListing),
    });

    // Check if the request was successful
    if (response.ok) {
      // Reset the form and display success message, remove alertErrorMessage if displayed
      event.target.reset();
      alertErrorMessage.style.display = "none";
      alertSuccessMessage.style.display = "block";

      // Redirect to the homepage after 2 seconds
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);

      // If response status is 400, display alert message
    } else if (response.status === 400) {
      alertErrorMessage.style.display = "block";
    }
  } catch (error) {
    // Throw an error with a detailed message if an error occurs
    throw new Error("Error creating listing:", error);
  }
};
