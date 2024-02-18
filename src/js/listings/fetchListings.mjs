import { apiBaseUrl, allListingsUrl } from "./variables.mjs";
import { fetchWithToken } from "./accessToken.mjs";
import { createMessage } from "./errorMessage.mjs";

/**
 * Fetches all posts with an access token
 * @returns {Promise} A promise representing the asynchronous operation of fetching posts.
 */
const fetchAllListings = async () => {
  return await fetchWithToken(`${apiBaseUrl}${allListingsUrl}?_author=true`);
};

/**
 * Creates an HTML card element.
 *
 * @param {Object} postData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
const createCardAllPosts = (postData) => {
  return cardColLayout;
};

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const listingsContainer = document.querySelector("#listings-container");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingListings = false;

/**
 * Displays post cards by fetching and rendering posts.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const displayAllListings = async () => {
  try {
    // If posts are already being loaded, return
    if (loadingListings) {
      return;
    }

    // Set loading flag to true
    loadingListings = true;

    // Display loader while posts are being fetched
    loaderContainer.style.display = "block";

    // Fetch listings
    const listings = await fetchAllListings();

    // Clear existing cards from the container
    listingsContainer.innerHTML = "";

    // Iterate over each post data and create a card for each post
    listings.forEach((postData) => {
      // Create a card element for the current post data
      const listingCard = createCardAllPosts(postData);
      // Append the generated card to the container for all posts
      listingsContainer.appendChild(listingCard);
    });
  } catch (error) {
    // Display error message
    listingsContainer.innerHTML = errorMessage;
    // Throw a new error
    throw new Error(error);
  } finally {
    // Reset loading flag and hide loader
    loadingListings = false;
    loaderContainer.style.display = "none";
  }
};

// Initial call to display blog cards
displayAllListings();
