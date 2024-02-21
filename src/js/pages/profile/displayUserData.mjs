import { fetchUserProfile } from "./fetchUserProfile.mjs";
import placeholderImg from "../../../images/no_img.jpg";
// Target DOM elements for user information display
const userNameContainer = document.querySelector("#userName");
const userAvatarContainer = document.querySelector("#userAvatar");
const userCreditContainer = document.querySelector("#userCredit");

/**
 * Displays the user's name and avatar.
 *
 * @throws {Error} - Throws an error if there's an issue during the display process.
 */
const displayUserData = async () => {
  try {
    // Fetch user profile data
    const json = await fetchUserProfile();
    // Display user name
    userNameContainer.innerText = json.name;
    // Set user avatar image source with a fallback if not available
    userAvatarContainer.src = !!json.avatar ? json.avatar : placeholderImg;

    userCreditContainer.innerText = json.credits;
  } catch (error) {
    // Throw an error
    throw new Error(error);
  }
};
// Initial call to display the single post card
displayUserData();
