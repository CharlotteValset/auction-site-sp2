import { fetchWithToken } from "../auth/accesstoken.mjs";
import { apiBaseUrl, allListingsUrl } from "../variables.mjs";

/**
 * Fetches all listings with an access token
 * @returns {Promise} A promise representing the asynchronous operation of fetching listings.
 */
export const fetchAllListings = async () => {
  return await fetchWithToken(
    `${apiBaseUrl}${allListingsUrl}?_bids=true&_active=true&sort=created&_seller=true&limit=25`,
  );
};
