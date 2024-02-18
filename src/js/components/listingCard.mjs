export const listingsCard = () => {
  const card = document.createElement("a");
  card.href = "../../../listing/index.html?id=${data.id}";
  card.className =
    "max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg";
  cardLayout.appendChild(card);

  const cardImage = document.createElement("img");
  cardImage.src = !!data.media ? data.media : "../../../images/decor.png";
  cardImage.className =
    "rounded-t-lg h-72 w-96 max-w-96 sm:h-64 sm:w-72 sm:max-w-72 object-cover";
  cardImage.setAttribute = ("alt", "${data.media.alt}");
  card.appendChild(cardImage);

  const cardTextWrapper = document.createElement("div");
  cardTextWrapper.className = "m-5";
  card.appendChild(cardTextWrapper);

  const cardHeading = document.createElement("h2");
  cardHeading.innerText = data.title;
  cardHeading.className =
    "mb-2 text-2xl font-normal font-kodchasan tracking-tight";
  card.appendChild(cardHeading);

  const latestBidWrapper = document.createElement("div");
  latestBidWrapper.className = "flex flex-row mb-2";
  card.appendChild(latestBidWrapper);

  const latestBidLabel = document.createElement("span");
  latestBidLabel.className = "mr-3";
  latestBidLabel.innerText = "Latest bid:";
  latestBidWrapper.appendChild(latestBidLabel);

  const latestBidAmount = document.createElement("span");
  latestBidLabel.className = "font-medium";
  latestBidLabel.innerText = data.bids.amount;
  latestBidWrapper.appendChild(latestBidAmount);

  const bidExpiresWrapper = document.createElement("div");
  bidExpiresWrapper.className = "flex flex-row";
  card.appendChild(bidExpiresWrapper);

  const bidExpiresLabel = document.createElement("span");
  bidExpiresLabel.className = "mr-3";
  bidExpiresLabel.innerText = "Expires in:";
  bidExpiresWrapper.appendChild(bidExpiresLabel);

  const bidExpiresCountdown = document.createElement("span");
  bidExpiresCountdown.className = "font-medium";
  bidExpiresCountdown.innerText = data.endsAt;
  bidExpiresWrapper.appendChild(bidExpiresCountdown);
};
