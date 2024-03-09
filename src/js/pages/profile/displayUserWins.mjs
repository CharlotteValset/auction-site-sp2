import { apiBaseUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken, getData } from "../../auth/accesstoken.mjs";
import { fetchSingleListing } from "../singleListing/singleListingPage.mjs";
import { createMessage } from "../../errorHandling/errorMessage.mjs";
import { listingsCard } from "../../components/listingCard.mjs";

// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

/**
 * Fetches the winning data for the currently logged-in user.
 *
 * @returns {Promise<Object>} A Promise that resolves to the winning data fetched for the user.
 * @throws {Error} Throws an error if there is an issue fetching the user's winning data.
 * @example
 * // Usage example:
 * const userWinsData = await fetchUserWins();
 */
export const fetchUserWins = async () => {
  return await fetchWithToken(
    `${apiBaseUrl}${profileUrl}${user.name}`,
    getData,
  );
};

// Targeting DOM elements
const loaderContainer = document.querySelector("#user-win-loader-container");
const noUserWinsOnListingsContainer = document.querySelector(
  "#no-user-win-container",
);
const userWinsOnListingsContainer = document.querySelector(
  "#user-win-container",
);
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingUserWinsOnListings = false;

/**
 * Displays the user's winning listings on the UI.
 *
 * @throws {Error} Throws an error if there is an issue fetching or displaying user's winning listings.
 * @example
 * // Usage example:
 * await displayUserWins();
 */
export const displayUserWins = async () => {
  try {
    // If listings are already being loaded, return
    if (loadingUserWinsOnListings) {
      return;
    }

    // Set loading flag to true
    loadingUserWinsOnListings = true;

    // Display loader while listings are being fetched
    loaderContainer.style.display = "block";

    // Fetch listings
    const userWinsOnListings = await fetchUserWins();

    // Clear existing cards from the container
    userWinsOnListingsContainer.innerHTML = "";

    if (
      userWinsOnListings &&
      userWinsOnListings.wins &&
      Array.isArray(userWinsOnListings.wins) &&
      userWinsOnListings.wins.length > 0
    ) {
      // Iterate over each user win and create a card for each
      userWinsOnListings.wins.forEach(async (data) => {
        const getSingleListing = await fetchSingleListing(data);
        const userWinCard = listingsCard(getSingleListing);
        // Append the generated card to the container for user wins
        userWinsOnListingsContainer.appendChild(userWinCard);
      });
    } else {
      // Display a message for no wins
      const infotext = document.createElement("p");
      infotext.className =
        "text-center text-green-primary mx-auto my-2 lg:text-left";
      infotext.innerHTML = "You haven't won an auction yet";
      noUserWinsOnListingsContainer.appendChild(infotext);
    }
  } catch (error) {
    // Display error message
    loaderContainer.innerHTML = errorMessage;
    // Throw a new error
    throw new Error(error);
  } finally {
    // Reset loading flag and hide loader
    loadingUserWinsOnListings = false;
    loaderContainer.style.display = "none";
  }
};
