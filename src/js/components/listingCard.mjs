import placeholderImg from "../../../images/no_img.jpg";
import { createCountdownTimer } from "../bids/bidCountdown.mjs";
import { sortByAmountDesc } from "../utils/sortByAmountDesc.mjs";
import { updateImageUrlFromDomains } from "../utils/updateImageUrls.mjs";

/**
 * Creates a card element for displaying listing information.
 *
 * @param {Object} data - The data object containing information about the listing.
 * @returns {HTMLDivElement} - The created card element.
 * @example
 * // Usage example:
 * const listingData = { id: 123, title: "Example Listing", bids: [...], media: ["image-url1", "image-url2"], endsAt: "2024-03-08T12:00:00Z" };
 * const cardElement = listingsCard(listingData);
 * document.body.appendChild(cardElement);
 */
export const listingsCard = (data) => {
  const card = document.createElement("div");
  card.className =
    "w-64 sm:w-96 md:w-72 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg";

  const cardHref = document.createElement("a");
  cardHref.href = `../../../listing/index.html?id=${data.id}`;
  card.appendChild(cardHref);

  const cardImage = document.createElement("img");
  cardImage.className = "h-64 w-full rounded-t-lg object-cover";
  cardImage.setAttribute("alt", `${data.title}`);
  cardImage.loading = "lazy";

  // Load the first image from the listing's media array, or use a placeholder if not available
  const imageArray = data.media;
  if (
    Array.isArray(imageArray) &&
    imageArray.length > 0 &&
    imageArray[0] !== "null"
  ) {
    cardImage.src = updateImageUrlFromDomains(imageArray[0]);
  } else {
    cardImage.src = `${placeholderImg}`;
  }

  // Handle image loading errors by using a placeholder
  cardImage.onerror = function () {
    cardImage.src = `${placeholderImg}`;
  };

  cardHref.appendChild(cardImage);

  const cardTextWrapper = document.createElement("div");
  cardTextWrapper.className = "p-5";
  cardHref.appendChild(cardTextWrapper);

  const cardHeading = document.createElement("h2");
  cardHeading.innerText = data.title;
  cardHeading.className =
    "truncate mb-3 text-2xl font-normal font-kodchasan tracking-tight";
  cardTextWrapper.appendChild(cardHeading);

  const latestBidWrapper = document.createElement("div");
  latestBidWrapper.className = "flex flex-row mb-2 items-center";
  cardTextWrapper.appendChild(latestBidWrapper);

  const latestBidLabel = document.createElement("span");
  latestBidLabel.className = "mr-3";
  latestBidLabel.innerText = "Latest bid:";
  latestBidWrapper.appendChild(latestBidLabel);

  // Sort the bids by amount in descending order
  const bids = sortByAmountDesc(data.bids);

  // Display the amount of the latest bid, or indicate if there are no bids
  const latestBidAmount = document.createElement("span");
  latestBidAmount.className = "font-semibold";
  latestBidAmount.innerText =
    bids.length > 0 ? `$ ${bids[0].amount}` : "No bids yet";
  latestBidWrapper.appendChild(latestBidAmount);

  const bidExpiresWrapper = document.createElement("div");
  bidExpiresWrapper.className = "flex flex-row";
  cardTextWrapper.appendChild(bidExpiresWrapper);

  const bidExpiresLabel = document.createElement("span");
  bidExpiresLabel.className = "mr-3";
  bidExpiresLabel.innerText = "Expires in:";
  bidExpiresWrapper.appendChild(bidExpiresLabel);

  const bidExpiresCountdown = document.createElement("span");
  bidExpiresCountdown.className = "bidExpiresCountdown";
  createCountdownTimer(data.endsAt, bidExpiresCountdown);
  bidExpiresWrapper.appendChild(bidExpiresCountdown);

  return card;
};
