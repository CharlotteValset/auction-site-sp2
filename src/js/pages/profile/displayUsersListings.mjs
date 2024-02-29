import { apiBaseUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken } from "../../auth/accesstoken.mjs";
import { createMessage } from "../../errorHandling/errorMessage.mjs";
import { listingsCard } from "../../components/listingCard.mjs";
import { sortByEndDate } from "../../utils/sortByEndDate.mjs";
// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

export const fetchUsersListings = async () => {
  return await fetchWithToken(
    `${apiBaseUrl}${profileUrl}${user.name}/listings?_bids=true&_active=true`,
  );
};
// Targeting DOM elements
const loaderContainer = document.querySelector(".loader-container");
const noListingsContainer = document.querySelector(
  "#no-user-listings-container",
);
const listingsContainer = document.querySelector("#user-listings-container");
const errorMessage = createMessage("error");

// Flag to prevent multiple simultaneous loading requests
let loadingListings = false;

/**
 * Displays listings cards by fetching and rendering listings.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const displayUserListings = async () => {
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
    const listings = await fetchUsersListings();

    // Sort the listings by endsAt date using your sortAcs function
    const sortedListings = sortByEndDate(listings);

    // Clear existing cards from the container
    listingsContainer.innerHTML = "";

    // Iterate over each listing data and create a card for each listing
    sortedListings.forEach((data) => {
      // Create a card element for the current listing data
      const listingCard = listingsCard(data);
      // Append the generated card to the container for all listings
      listingsContainer.appendChild(listingCard);
    });

    if (sortedListings == 0) {
      const infotext = document.createElement("p");
      infotext.className =
        "text-center text-green-primary mx-auto my-2 lg:text-left";
      infotext.innerHTML = "You haven't added any listings yet";
      noListingsContainer.appendChild(infotext);
    }
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
