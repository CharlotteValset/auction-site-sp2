import { apiBaseUrl, allListingsUrl } from "../variables.mjs";

// Extracting the listing ID from the URL query string
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Makes a bid on a listing by sending a POST request to the server.
 *
 * @async
 * @param {string} userToken - The user's authentication token.
 * @param {Object} dataObj - The bid data to be included in the request body.
 * @returns {Promise<Response>} - A Promise that resolves to the fetch response.
 * @example
 * // Usage example:
 * const userToken = "exampleToken";
 * const bidData = { amount: 100 };
 * try {
 *   const response = await makeBid(userToken, bidData);
 *   // Handle the bid response
 *   console.log(response);
 * } catch (error) {
 *   // Handle bid failure or fetch operation error
 *   console.error(error.message);
 * }
 */
export const makeBid = async (userToken, dataObj) => {
  // Send a POST request to make a bid on the listing
  return await fetch(`${apiBaseUrl}${allListingsUrl}/${id}/bids?_bids=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(dataObj),
  });
};
