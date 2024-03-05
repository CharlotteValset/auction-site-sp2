//Imports
import { apiBaseUrl, allListingsUrl } from "../variables.mjs";
import { showAlert } from "../utils/showAlert.mjs";

// Get the form element for creating a new post
export const createListingForm = document.querySelector("#new-listing");

/**
 * Handles the form submission to create a new listing.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the listing creation is complete.
 */
export const createListing = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

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
    const alertMessage = document.querySelector(".alert-message");
    alertMessage.style.display = "block";
    return;
  }

  const media = [];

  mediaInput.forEach(function (input) {
    if (input.value) {
      media.push(input.value);
    }
  });

  const newListing = {
    title: title,
    description: description,
    media: media,
    endsAt: bidDeadlineDate,
  };

  try {
    // Send a POST request to create a new post
    const response = await fetch(`${apiBaseUrl}${allListingsUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newListing),
    });

    console.log(response);

    // Check if the request was successful
    if (response.ok) {
      event.target.reset();

      const alertSuccessMessage = document.querySelector(".success-message");
      alertSuccessMessage.style.display = "block";

      // Redirect to the homepage
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);

      // If response status is 400, display alert message
    } else if (response.status === 400) {
      const alertErrorMessage = document.querySelector(".alert-error-message");
      alertErrorMessage.style.display = "block";
    }
  } catch (error) {
    // Throw an error with a detailed message if an error occurs
    throw new Error("Error creating listing:", error);
  }
};
