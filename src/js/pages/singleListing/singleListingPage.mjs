import { apiBaseUrl, allListingsUrl } from "../../variables.mjs";
import { fetchWithToken, getData } from "../../auth/accesstoken.mjs";
import { fetchUserProfile } from "../profile/fetchUserProfile.mjs";
import { sortByAmountDesc } from "../../utils/sortByAmountDesc.mjs";
import { createCountdownTimer } from "../../bids/bidCountdown.mjs";
import placeholderImg from "../../../../images/no_img.jpg";

// Extracting the post ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const fetchSinglePost = async (id) => {
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

/**
 * Creates an HTML card element for a single post.
 * @param {Object} listingData The data for the post.
 * @returns {HTMLElement} The generated HTML card element.
 */
export const displaySingleListingsData = async () => {
  try {
    // Fetch listing data
    const data = await fetchSinglePost(id);
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

export const displayUserCredit = async () => {
  try {
    // Fetch user profile data
    const data = await fetchUserProfile();

    usersCurrentCredit.innerText = data.credits;
  } catch (error) {
    // Throw an error
    throw new Error(error);
  }
};
