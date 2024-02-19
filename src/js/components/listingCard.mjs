export const listingsCard = (data) => {
  const card = document.createElement("a");
  card.href = `../../../listing/index.html?id=${data.id}`;
  card.className =
    "max-w-sm sm:max-w-72 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg";

  const cardImage = document.createElement("img");
  cardImage.className =
    "rounded-t-lg h-72 w-96 max-w-96 sm:h-64 sm:w-72 sm:max-w-72 object-cover";

  if (
    Array.isArray(data.media) &&
    data.media.length > 0 &&
    data.media[0] !== "null"
  ) {
    cardImage.src = data.media[0];
  } else {
    cardImage.src = "/images/no_img.jpg";
  }

  card.appendChild(cardImage);

  const cardTextWrapper = document.createElement("div");
  cardTextWrapper.className = "p-5";
  card.appendChild(cardTextWrapper);

  function shortenHeading(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const originalTitle = data.title;
  const shortenedTitle = shortenHeading(originalTitle, 15);

  const cardHeading = document.createElement("h2");
  cardHeading.innerText = shortenedTitle;
  cardHeading.className =
    "mb-2 text-2xl font-normal font-kodchasan tracking-tight";
  cardTextWrapper.appendChild(cardHeading);

  const latestBidWrapper = document.createElement("div");
  latestBidWrapper.className = "flex flex-row mb-2";
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
  latestBidAmount.className = "font-medium";
  latestBidAmount.innerText =
    bids.length > 0 ? `${bids[0].amount}` : "No bids yet";
  /* latestBidAmount.innerText = `${bids[0].amount}`; */
  latestBidWrapper.appendChild(latestBidAmount);

  /*   const latestBidAmount = document.createElement("span");
  latestBidAmount.className = "font-medium";
  latestBidAmount.innerText = data.bids.amount;
  latestBidWrapper.appendChild(latestBidAmount); */

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
