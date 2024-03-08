import { fetchWithToken } from "../auth/accesstoken.mjs";
import { apiBaseUrl, allListingsUrl } from "../variables.mjs";
import { listingsCard } from "../components/listingCard.mjs";
import { sortByEndDate } from "../utils/sortByEndDate.mjs";
import {
  listingsContainer,
  errorMessage,
} from "../listings/displayListings.mjs";
// Array to store fetched listings
let listingsArray = [];

// URL to the fetch API
const API_URL = `${apiBaseUrl}${allListingsUrl}?_bids=true&_active=true&sort=created&limit=50`;

/**
 * Renders all the listings in the selected container.
 *
 * @param {Object[]} listing An array of listings objects to be rendered.
 * @example
 * Assume filteredListings is an array of listings objects obtained through some filtering mechanism.
 * renderListings(filteredListings);
 */
const renderListings = (listing) => {
  const resultMessageContainer = document.querySelector("#resultMessage");
  const listingContainer = document.querySelector("#listings-container");
  resultMessageContainer.innerHTML = "";
  listingContainer.innerHTML = "";

  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value;

  if (listing.length === 0) {
    // If no listings are found, display a message
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "text-center mx-auto bold";
    noResultsMessage.innerText = `Search result "${searchTerm}" not found.`;
    resultMessageContainer.appendChild(noResultsMessage);
  } else {
    // Render the listings
    listing.forEach((data) => {
      // Create a card element for the current listing data
      const listingCard = listingsCard(data);
      // Append the generated card to the container for all listings
      listingContainer.appendChild(listingCard);
    });
  }
};

/**
 * Filter listings based on the provided search text and renders the filtered listings.
 *
 * @param {string} inputText The search text to filter listings.
 * @example
 * filterListings(searchTerm);
 */
const filterListings = (inputText) => {
  // Create a new array of listings that match the search criteria
  const filteredListings = listingsArray.filter((listing) => {
    // Check if the lowercase version of listing title/content includes the lowercase search text
    const titleMatch = listing.title
      .toLowerCase()
      .includes(inputText.toLowerCase());
    const contentMatch = listing.description
      ?.toLowerCase()
      .includes(inputText.toLowerCase());
    // Return true if any of the conditions (title or content) are true
    return titleMatch || contentMatch;
  });
  renderListings(filteredListings);
};

// Adds an event listener to the search form, preventing its default submission behavior.
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Extracts and trims the search term from the input field.
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    // If search term is empty, render all listings
    return renderListings(listingsArray);
  }

  // Call the filterListings function with the search term
  filterListings(searchTerm);
});

/**
 * Initializes the app by fetching listings and rendering them.
 * @throws {Error} - Throws an error if there's an issue during the fetch operation.
 */
export const initialize = async () => {
  try {
    // Fetch listings from the API
    listingsArray = await fetchWithToken(API_URL);

    // Sort the listings by endsAt date in ascending order using sortAcs
    listingsArray = sortByEndDate(listingsArray);
    // Render the fetched listings
    renderListings(listingsArray);
  } catch (error) {
    listingsContainer.innerHTML = errorMessage;
    throw new Error("Error fetching listings:", error); // Re-throw the error if needed
  }
};
