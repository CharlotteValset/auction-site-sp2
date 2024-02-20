import placeholderImg from "../../../images/no_img.jpg";

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

  /**
   * Trims a given text to a specified maximum length and appends "..." if trimmed.
   *
   * @param {string} text - The text to be trimmed.
   * @param {number} maxLength - The maximum length for the trimmed text.
   * @returns {string} - The trimmed text or the original text if it's within the specified length.
   */
  function trimsHeading(text, maxLength) {
    // Check if the length of the text exceeds the specified maximum length
    if (text.length > maxLength) {
      // If yes, return the substring up to maxLength and append "..."
      return text.substring(0, maxLength) + "...";
    }

    // If the text is within the specified length, return the original text
    return text;
  }

  // Assume data.title is a string representing the original title
  const originalTitle = data.title;

  // Trim the original title to a maximum of 15 characters
  const trimmedTitle = trimsHeading(originalTitle, 15);

  const cardHeading = document.createElement("h2");
  cardHeading.innerText = trimmedTitle;
  cardHeading.className =
    "mb-2 text-2xl font-normal font-kodchasan tracking-tight";
  cardTextWrapper.appendChild(cardHeading);

  const latestBidWrapper = document.createElement("div");
  latestBidWrapper.className = "flex flex-row mb-2 items-center";
  cardTextWrapper.appendChild(latestBidWrapper);

  const latestBidLabel = document.createElement("span");
  latestBidLabel.className = "mr-3";
  latestBidLabel.innerText = "Latest bid:";
  latestBidWrapper.appendChild(latestBidLabel);

  const sortBidAmountDesc = (array) => {
    const sortedArray = array.sort(function (a, b) {
      return b.amount - a.amount; // Sort in descending order by bid amount
    });
    return sortedArray;
  };

  const bids = sortBidAmountDesc(data.bids);

  const latestBidAmount = document.createElement("span");
  latestBidAmount.className = " text-xl font-medium align-center";
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
  bidExpiresCountdown.className = "font-medium";
  bidExpiresCountdown.innerText = data.endsAt;
  bidExpiresWrapper.appendChild(bidExpiresCountdown);

  return card;
};
