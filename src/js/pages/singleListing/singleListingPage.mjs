import { apiBaseUrl, allListingsUrl, profileUrl } from "../../variables.mjs";
import { user } from "../profile/fetchUserProfile.mjs";
import { fetchWithToken, getData } from "../../auth/accesstoken.mjs";
import { sortByAmountDesc } from "../../utils/sortByAmountDesc.mjs";
import { createCountdownTimer } from "../../bids/bidCountdown.mjs";
import { formatDateString } from "../../utils/formatDate.mjs";
import { formatTimeString } from "../../utils/formatTime.mjs";
import { addBidToListingForm } from "../../bids/addBidToListing.mjs";
import { handleImageError } from "../../errorHandling/handleImageError.mjs";
import placeholderImg from "../../../../images/no_img.jpg";

// Extracting the listing ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Fetches data for a single listing, including bids and seller information.
 *
 * @param {string} id - The unique identifier of the listing.
 * @returns {Promise<Object>} A Promise that resolves to the fetched data for the single listing.
 * @throws {Error} Throws an error if the fetch operation fails or encounters an error.
 *
 * @example
 * const listingId = "abc123";
 * const listingData = await fetchSingleListing(listingId);
 */
export const fetchSingleListing = async (id) => {
  return await fetchWithToken(
    `${apiBaseUrl}${allListingsUrl}/${id}?_bids=true&_seller=true`,
    getData,
  );
};

// Targeting DOM elements
const listingImage1 = document.querySelector("#listing-image-1");
const listingImage2 = document.querySelector("#listing-image-2");
const listingImage3 = document.querySelector("#listing-image-3");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-description");
const listingHighestBid = document.querySelector("#listing-hightest-bid");
const listingEndsIn = document.querySelector("#listing-endsIn");
const usersCurrentCredit = document.querySelector("#users-current-credit");
const accessToken = localStorage.getItem("accessToken");
export const userCreditContainer = document.querySelector("#user-credit");
const accordionCollapseBody = document.querySelector("#accordion-collapse");
const userInfoContainer = document.querySelector("#user-info-text");

/**
 * Fetches and displays data for a single listing on the page.
 *
 * @throws {Error} Throws an error if there is an issue fetching or displaying the listing data.
 * @example
 * await displaySingleListingsData();
 */
export const displaySingleListingsData = async () => {
  try {
    // Fetch listing data
    const data = await fetchSingleListing(id);

    // Set the document title with the listing title
    document.title = `${data.title} | BidOnIt`;

    // Extract the first three images from the listing data
    const [image1, image2, image3] = data.media.slice(0, 3);

    // Create an array of image elements
    const imageElements = [listingImage1, listingImage2, listingImage3];

    // Loop through image elements and set source and alt attributes
    for (let i = 0; i < imageElements.length; i++) {
      const imageElement = imageElements[i];

      if (i === 0 && image1 && image1 !== "null") {
        imageElement.src = image1;
        imageElement.alt = data.title;
      } else if (i === 1 && image2 && image2 !== "null") {
        imageElement.src = image2;
        imageElement.alt = data.title;
      } else if (i === 2 && image3 && image3 !== "null") {
        imageElement.src = image3;
        imageElement.alt = data.title;
      } else {
        // Set a placeholder image if no valid image is available
        imageElement.src = placeholderImg;
        imageElement.alt = "Placeholder Image";
      }

      // Handle image error by replacing it with a placeholder
      handleImageError(imageElement);
    }

    // Get navigation controls and indicators elements
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const indicators = document.getElementById("indicators");

    // Disable navigation controls and indicators if there's only one image
    if (data.media.length <= 1) {
      nextButton.style.display = "none";
      prevButton.style.display = "none";
      indicators.style.display = "none";
    }

    // Set listing title and description
    listingTitle.innerText = data.title;

    if (data.description !== "null") {
      listingDescription.innerText = data.description;
    } else {
      listingDescription.innerText = "";
    }

    // Sort bids in descending order and display the highest bid amount
    const bids = sortByAmountDesc(data.bids);
    listingHighestBid.innerText =
      bids.length > 0 ? `$ ${bids[0].amount}` : "No bids yet";

    // Create and display countdown timer for the listing's end time
    createCountdownTimer(data.endsAt, listingEndsIn, true);
  } catch (error) {
    // Throw an error with a message if an issue occurs
    throw new Error(`Error displaying single listing data: ${error.message}`);
  }
};

/**
 * Conditionally removes credit and bid form if the logged-in user is the seller of the listing.
 * Displays a custom message for the seller.
 *
 * @throws {Error} Throws an error if there is an issue fetching listing data or processing the seller check.
 *
 * @example
 * await removeCreditAndAddBidIfUserIsSeller();
 */
export const removeCreditAndAddBidIfUserIsSeller = async () => {
  try {
    // Attempt to fetch user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // Return if user profile or user name is not available
    if (!userProfile || !userProfile.name) {
      return;
    }
    // Fetch listing data for the current listing
    const listingsData = await fetchSingleListing(id);

    // Get the name of the seller for the current listing
    const sellerName = listingsData.seller.name;

    // Check if the logged-in user is the seller of the listing
    if (userProfile.name === sellerName) {
      // Hide bid form and user credit display for the seller
      addBidToListingForm.style.display = "none";
      userCreditContainer.style.display = "none";

      // Display a custom message for the seller
      const userInfotext = document.createElement("p");
      userInfotext.className =
        "text-green-primary my-2 pt-4 text-center sm:text-left text-2xl";
      userInfotext.innerHTML = "Thank you for adding this item up for auction!";
      userInfoContainer.appendChild(userInfotext);
    }
  } catch (error) {
    // Log an error if an issue occurs during execution
    console.error("An error occurred:", error);
    // Throw an error with a message
    throw new Error(`Error processing seller check: ${error.message}`);
  }
};

/**
 * Displays the bid history for a single listing.
 * If the user is authenticated, fetches and displays the bid history,
 * otherwise hides the bid history section.
 *
 * @throws {Error} Throws an error if there is an issue fetching bid history data or processing the display.
 *
 * @example
 * await displayBidHistory();
 */
export const displayBidHistory = async () => {
  try {
    // Check if the user is authenticated
    if (accessToken) {
      // Fetch the listing data for the current listing
      const data = await fetchSingleListing(id);

      // Sort the bids in descending order by amount
      const bids = sortByAmountDesc(data.bids);

      // Get the bid history container element
      const bidHistoryContainer = document.querySelector("#bid-history");
      bidHistoryContainer.innerHTML = "";

      // Iterate over each bid and create a row in the bid history container
      for (let i = 0; i < bids.length; i++) {
        const bid = bids[i];

        // Create a new row for each bid
        const row = document.createElement("div");
        row.className = "flex flex-row justify-between w-56 mb-1";

        // Create individual elements for date, time, and amount
        const dateElement = document.createElement("p");
        dateElement.className = "mb-1";
        const formattedDate = formatDateString(bid.created);
        dateElement.innerText = formattedDate;

        const timeElement = document.createElement("p");
        timeElement.className = "mb-1";
        const formattedTime = formatTimeString(bid.created);
        timeElement.innerText = formattedTime;

        const amountElement = document.createElement("p");
        amountElement.className = "mb-1";
        amountElement.textContent = `$ ${bid.amount}`;

        // Append date, time, and amount to the row
        row.appendChild(dateElement);
        row.appendChild(timeElement);
        row.appendChild(amountElement);

        // Append the row to the bid history container
        bidHistoryContainer.appendChild(row);
      }

      // Hide the bid history section if there are no bids
      if (bids.length == 0) {
        accordionCollapseBody.style.display = "none";
      }
    }
    // Hide the bid history section if the user is not authenticated
    if (!accessToken) {
      accordionCollapseBody.style.display = "none";
    }
  } catch (error) {
    // Log an error if an issue occurs during execution
    console.error("An error occurred:", error);
    // Throw an error with a message
    throw new Error(`Error displaying bid history: ${error.message}`);
  }
};

/**
 * Fetches user profile data using the provided user name and authentication token.
 *
 * @returns {Promise<Object>} A promise that resolves to the user profile data.
 *
 * @example
 * const userData = await fetchUserData();
 */
const fetchUserData = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?`);
};

/**
 * Displays the user's credit information on the page.
 * If the user is logged in (has an access token), it fetches the user profile data,
 * shows the user credit container, and updates the displayed credit amount.
 * If the user is not logged in, it hides the user credit container.
 *
 * @throws {Error} Throws an error if there is an issue fetching user data or if the response indicates an error.
 *
 * @returns {Promise<void>} A promise that resolves when the user credit information is displayed.
 *
 * @example
 * try {
 *   await displayUserCredit();
 * } catch (error) {
 *   console.error("Error displaying user credit:", error.message);
 * }
 */
export const displayUserCredit = async () => {
  try {
    // Check if the user is logged in (has an access token)
    if (accessToken) {
      // Fetch user profile data
      const userData = await fetchUserData();

      // Show the user credit container
      userCreditContainer.style.display = "block";

      // Update the displayed user credit amount
      usersCurrentCredit.innerText = `Your current credit: $ ${userData.credits}`;
    } else {
      // If the user is not logged in, hide the user credit container
      userCreditContainer.style.display = "none";
    }
  } catch (error) {
    // Log an error if an issue occurs during execution
    console.error("An error occurred:", error);
    // Throw an error
    throw new Error(`Error displaying user credit: ${error.message}`);
  }
};
