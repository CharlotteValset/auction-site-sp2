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
  const imageUrl1 = event.target.querySelector("#new-listing-image1").value;
  const imageUrl2 = event.target.querySelector("#new-listing-image2").value;
  const imageUrl3 = event.target.querySelector("#new-listing-image3").value;
  const bidDeadlineDate =
    event.target.querySelector("#bid-deadline-date").value;

  // Check if required fields are filled
  if (!title || !description || !bidDeadlineDate) {
    // Display an alert if required fields are not filled
    showAlert("Please fill in all required fields");
    return;
  }

  const mediaInput = event.target.querySelectorAll(".addImage");
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
    if (response.errors) {
      // Throw an error if the request was not successful
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Reset the form after successful post creation
    event.target.reset();

    window.location.href = "/index.html";
  } catch (error) {
    // Log the detailed error message
    console.error("Error creating post:", error.message);

    // Rethrow the error if needed
    throw error;
  }
};
