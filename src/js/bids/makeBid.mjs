import { apiBaseUrl, allListingsUrl } from "../variables.mjs";

// Extracting the listing ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Function to make a bid using fetch
export const makeBid = async (userToken, dataObj) => {
  return await fetch(`${apiBaseUrl}${allListingsUrl}/${id}/bids?_bids=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(dataObj),
  });
};
