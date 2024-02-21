import { apiBaseUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken } from "../../auth/accesstoken.mjs";

// Retrieve user profile information from localStorage
const user = JSON.parse(localStorage.getItem("userProfile"));

/**
 * Fetches the user profile data with an access token.
 * @returns {Promise<UserProfile>} - A promise that resolves to the user's profile data.
 */
export const fetchUserProfile = async () => {
  return await fetchWithToken(`${apiBaseUrl}${profileUrl}/${user.name}?`);
};
