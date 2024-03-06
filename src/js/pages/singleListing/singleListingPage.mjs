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

// Extracting the post ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

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

export const displaySingleListingsData = async () => {
  try {
    // Fetch listing data
    const data = await fetchSingleListing(id);
    console.log("Listing-data:", data);

    document.title = `${data.title} | BidOnIt`;

    // Extract the first three images from the listing data
    const [image1, image2, image3] = data.media.slice(0, 3);

    const imageElements = [listingImage1, listingImage2, listingImage3];

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
        imageElement.src = placeholderImg;
        imageElement.alt = "Placeholder Image";
      }

      handleImageError(imageElement);
    }

    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const indicators = document.getElementById("indicators");

    if (data.media.length <= 1) {
      // Disable the navigation controls and indicators
      nextButton.style.display = "none";
      prevButton.style.display = "none";
      indicators.style.display = "none";
    }

    listingTitle.innerText = data.title;

    if (data.description !== "null") {
      listingDescription.innerText = data.description;
    } else {
      listingDescription.innerText = "";
    }

    const bids = sortByAmountDesc(data.bids);
    listingHighestBid.innerText =
      bids.length > 0 ? `$ ${bids[0].amount}` : "No bids yet";

    createCountdownTimer(data.endsAt, listingEndsIn, true);
  } catch (error) {
    // Throw an error
    throw new Error(error);
  }
};

export const removeCreditAndAddBidIfUserIsSeller = async () => {
  try {
    // Attempt to fetch user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!userProfile || !userProfile.name) {
      return;
    }

    const listingsData = await fetchSingleListing(id);
    const sellerName = listingsData.seller.name;

    if (userProfile.name === sellerName) {
      addBidToListingForm.style.display = "none";
      userCreditContainer.style.display = "none";

      const userInfotext = document.createElement("p");
      userInfotext.className =
        "text-green-primary my-2 pt-4 text-center sm:text-left text-2xl";
      userInfotext.innerHTML = "Thank you for adding this item up for auction!";
      userInfoContainer.appendChild(userInfotext);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const displayBidHistory = async () => {
  if (accessToken) {
    const data = await fetchSingleListing(id);
    const bids = sortByAmountDesc(data.bids);

    const bidHistoryContainer = document.querySelector("#bid-history");
    bidHistoryContainer.innerHTML = "";

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

    if (bids.length == 0) {
      accordionCollapseBody.style.display = "none";
    }
  }
  if (!accessToken) {
    accordionCollapseBody.style.display = "none";
  }
};

const fetchUserData = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}${user.name}?`);
};

export const displayUserCredit = async () => {
  try {
    if (accessToken) {
      const userProfileString = localStorage.getItem("userProfile");
      const userProfileObject = JSON.parse(userProfileString);
      const userName = userProfileObject.name;
      console.log(userName);

      // Fetch user profile data
      const userData = await fetchUserData();

      userCreditContainer.style.display = "block"; // Show the user credit container

      usersCurrentCredit.innerText = `Your current credit: $ ${userData.credits}`;
    } else {
      userCreditContainer.style.display = "none"; // Hide the user credit container
    }
  } catch (error) {
    // Throw an error
    throw new Error(error);
  }
};
