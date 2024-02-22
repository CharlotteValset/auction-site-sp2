import placeholderImg from "../../../images/no_img.jpg";
import { createCountdownTimer } from "../bids/bidCountdown.mjs";
import { sortByAmountDesc } from "../utils/sortByAmountDesc.mjs";

export const listingsCard = (data) => {
  const card = document.createElement("a");
  card.href = `../../../listing/index.html?id=${data.id}`;
  card.className =
    "max-w-sm sm:max-w-72 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg";

  const cardImage = document.createElement("img");
  cardImage.className =
    "rounded-t-lg h-72 w-96 max-w-96 sm:h-64 sm:w-72 sm:max-w-72 object-cover";

  // Check if data.media is an array, has at least one element, and the first element is not the string "null"
  if (
    Array.isArray(data.media) &&
    data.media.length > 0 &&
    data.media[0] !== "null"
  ) {
    // If the conditions are met, set the image source to the first element of data.media
    cardImage.src = data.media[0];
  } else {
    // If data.media is not an array, is empty, or the first element is "null", use the placeholder image
    cardImage.src = `${placeholderImg}`;
  }

  card.appendChild(cardImage);

  const cardTextWrapper = document.createElement("div");
  cardTextWrapper.className = "p-5";
  card.appendChild(cardTextWrapper);

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

  const bids = sortByAmountDesc(data.bids);
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
  bidExpiresCountdown.id = "bidExpiresCountdown";
  bidExpiresCountdown.className = "";
  createCountdownTimer(data.endsAt, bidExpiresCountdown);
  bidExpiresWrapper.appendChild(bidExpiresCountdown);

  return card;
};
