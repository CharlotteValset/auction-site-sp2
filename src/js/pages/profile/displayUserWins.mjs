import { apiBaseUrl, profileUrl, allListingsUrl } from "../../variables.mjs";
import { fetchWithToken, getData } from "../../auth/accesstoken.mjs";
import { createMessage } from "../../errorHandling/errorMessage.mjs";
//import placeholderImg from "../../../../images/no_img.jpg";

/* const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id"); */

const fetchSingleListing = async (id) => {
  return await fetchWithToken(
    `${apiBaseUrl}${allListingsUrl}/${id}?_bids=true`,
    getData,
  );
};

const createUserWinsCard = async (data) => {
  // Create a card container
  const cardContainer = document.createElement("div");
  cardContainer.className =
    "user-bid-card bg-white p-4 mb-4 rounded-md shadow-md";

  const winTitle = document.createElement("a");
  winTitle.className = "text-lg font-semibold mb-2";

  if (data) {
    const singleListing = await fetchSingleListing(data);
    console.log(singleListing);
  } else {
    winTitle.textContent = "No listings won yet";
  }

  console.log("Data:", data);

  cardContainer.appendChild(winTitle);

  return cardContainer;
};

// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

export const fetchUserWins = async () => {
  return await fetchWithToken(
    `${apiBaseUrl}${profileUrl}${user.name}`,
    getData,
  );
};
console.log("user", user.name);

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
 * Displays listings cards by fetching and rendering listings.
 *
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
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

    // Sort the listings by endsAt date using your sortAcs function
    console.log("userWinsListings", userWinsOnListings);

    // Clear existing cards from the container
    userWinsOnListingsContainer.innerHTML = "";

    if (
      userWinsOnListings &&
      userWinsOnListings.wins &&
      Array.isArray(userWinsOnListings.wins) &&
      userWinsOnListings.wins.length > 0
    ) {
      // Iterate over each user bid and create a card for each
      userWinsOnListings.wins.forEach((data) => {
        // Create a card element for the current user bid data
        const bidCard = createUserWinsCard(data);
        // Append the generated card to the container for user bids
        userWinsOnListingsContainer.appendChild(bidCard);
      });
    } else {
      // Display a message for no bids
      const infotext = document.createElement("p");
      infotext.className =
        "text-center text-green-primary mx-auto my-2 lg:text-left";
      infotext.innerHTML = "You haven't made any bids yet";
      noUserWinsOnListingsContainer.appendChild(infotext);
    }
  } catch (error) {
    // Display error message
    console.log("something here");
    loaderContainer.innerHTML = errorMessage;
    // Throw a new error
    throw new Error(error);
  } finally {
    // Reset loading flag and hide loader
    loadingUserWinsOnListings = false;
    loaderContainer.style.display = "none";
  }
};
