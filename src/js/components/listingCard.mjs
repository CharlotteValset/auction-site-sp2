import placeholderImg from "../../../images/no_img.jpg";
import { createCountdownTimer } from "../bids/bidCountdown.mjs";
import { sortByAmountDesc } from "../utils/sortByAmountDesc.mjs";

export const listingsCard = (data) => {
  const card = document.createElement("div");
  card.className =
    "w-64 sm:w-96 md:w-72 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg";

  const cardHref = document.createElement("a");
  cardHref.href = `../../../listing/index.html?id=${data.id}`;
  card.appendChild(cardHref);

  const cardImage = document.createElement("img");
  cardImage.className = "rounded-t-lg w-72 h-64 sm:w-96 md:w-72 object-cover";
  cardImage.setAttribute("alt", `${data.title}`);
  const imageArray = data.media;

  if (
    Array.isArray(imageArray) &&
    imageArray.length > 0 &&
    imageArray[0] !== "null"
  ) {
    cardImage.src = imageArray[0];
  } else {
    cardImage.src = `${placeholderImg}`;
  }

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
