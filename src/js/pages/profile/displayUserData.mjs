import { fetchUserProfile } from "./fetchUserProfile.mjs";
import placeholderAvatarImg from "../../../../images/no_avatarImg.jpg";

// Target DOM elements for user information display
const userNameContainer = document.querySelector("#userName");
const userAvatarContainer = document.querySelector("#userAvatar");
const userCreditContainer = document.querySelector("#userCredit");

/**
 * Fetches user profile data and displays it on the user interface.
 *
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when the user data is successfully displayed.
 * @throws {Error} Throws an error if there is an issue fetching or displaying the user data.
 * @example
 * // Usage example:
 * await displayUserData();
 */
export const displayUserData = async () => {
  try {
    // Fetch user profile data
    const data = await fetchUserProfile();

    // Display user name
    userNameContainer.innerText = data.name;

    // Set user avatar image source with a fallback if not available
    userAvatarContainer.src = !!data.avatar
      ? data.avatar
      : placeholderAvatarImg;

    // Display user credits
    userCreditContainer.innerText = data.credits;
  } catch (error) {
    // Throw an error if there is an issue fetching or displaying the user data
    throw new Error(error);
  }
};
