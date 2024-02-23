import { fetchUserProfile } from "./fetchUserProfile.mjs";
import placeholderAvatarImg from "../../../../images/no_avatarImg.jpg";

// Target DOM elements for user information display
const userNameContainer = document.querySelector("#userName");
const userAvatarContainer = document.querySelector("#userAvatar");
const userCreditContainer = document.querySelector("#userCredit");

/**
 * Displays the user's name and avatar.
 *
 * @throws {Error} - Throws an error if there's an issue during the display process.
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

    userCreditContainer.innerText = data.credits;
  } catch (error) {
    // Throw an error
    throw new Error(error);
  }
};
