import { apiBaseUrl, allListingsUrl } from "../variables.mjs";
import { fetchWithToken } from "../auth/accessToken.mjs";
import { createMessage } from "../errorHandling/errorMessage.mjs";
import { listingsCard } from "../components/listingCard.mjs";

/**
 * Fetches all posts with an access token
 * @returns {Promise} A promise representing the asynchronous operation of fetching listings.
 */
const fetchAllListings = async () => {
  return await fetchWithToken(`${apiBaseUrl}${allListingsUrl}?_bids=true`);
};

// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const listingsContainer = document.querySelector("#listings-container");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingListings = false;

/**
 * Displays listings cards by fetching and rendering listings.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const displayAllListings = async () => {
  try {
    // If listings are already being loaded, return
    if (loadingListings) {
      return;
    }

    // Set loading flag to true
    loadingListings = true;

    // Display loader while listings are being fetched
    loaderContainer.style.display = "block";

    // Fetch listings
    const listings = await fetchAllListings();

    console.log("listings", listings);

    // Clear existing cards from the container
    listingsContainer.innerHTML = "";

    // Iterate over each listing data and create a card for each listing
    listings.forEach((data) => {
      // Create a card element for the current listing data
      const listingCard = listingsCard(data);
      // Append the generated card to the container for all listings
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
