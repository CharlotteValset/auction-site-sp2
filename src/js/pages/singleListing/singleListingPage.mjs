import { apiBaseUrl, allListingsUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken, getData } from "../../auth/accesstoken.mjs";
import { sortByAmountDesc } from "../../utils/sortByAmountDesc.mjs";
import { createCountdownTimer } from "../../bids/bidCountdown.mjs";
import { formatDateString } from "../../utils/formatDate.mjs";
import { formatTimeString } from "../../utils/formatTime.mjs";
import placeholderImg from "../../../../images/no_img.jpg";

// Extracting the post ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export const fetchSingleListing = async (id) => {
  return await fetchWithToken(
    `${apiBaseUrl}${allListingsUrl}/${id}?_bids=true`,
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
const userCreditContainer = document.querySelector("#user-credit");
const accordionCollapseBody = document.querySelector("#accordion-collapse");

export const displaySingleListingsData = async () => {
  try {
    // Fetch listing data
    const data = await fetchSingleListing(id);
    console.log("Listing-data:", data);

    if (
      Array.isArray(data.media) &&
      data.media.length > 0 &&
      data.media[0] !== "null"
    ) {
      // If the conditions are met, set the image source to the first element of data.media
      listingImage1.src = data.media[0];

      // Check if the second element exists before setting the source for listingImage2
      if (data.media.length > 1 && data.media[1] !== "null") {
        listingImage2.src = data.media[1];
      } else {
        // If the second element doesn't exist or is "null", use the placeholder image
        listingImage2.src = `${placeholderImg}`;
      }

      // Check if the third element exists before setting the source for listingImage3
      if (data.media.length > 2 && data.media[2] !== "null") {
        listingImage3.src = data.media[2];
      } else {
        // If the third element doesn't exist or is "null", use the placeholder image
        listingImage3.src = `${placeholderImg}`;
      }
    } else {
      // If data.media is not an array, is empty, or the first element is "null", use the placeholder image for all images
      listingImage1.src = `${placeholderImg}`;
      listingImage2.src = `${placeholderImg}`;
      listingImage3.src = `${placeholderImg}`;
    }

    function handleImageError(image) {
      image.onerror = function () {
        image.src = placeholderImg;
      };
    }

    const imageElements = [listingImage1, listingImage2, listingImage3];
    imageElements.forEach(handleImageError);

    listingTitle.innerText = data.title;

    if (data.description !== "null") {
      listingDescription.innerText = data.description;
    } else {
      listingDescription.innerText = "";
    }

    const bids = sortByAmountDesc(data.bids);
    listingHighestBid.innerText =
      bids.length > 0 ? `$ ${bids[0].amount}` : "No bids yet";

    createCountdownTimer(data.endsAt, listingEndsIn);
  } catch (error) {
    // Throw an error
    throw new Error(error);
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

const user = JSON.parse(localStorage.getItem("userProfile"));
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
