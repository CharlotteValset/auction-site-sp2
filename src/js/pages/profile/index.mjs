import { displayUserData } from "./displayUserData.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";
import {
  createListing,
  createListingForm,
} from "../../listings/addNewListing.mjs";
import { editAvatar } from "./editUserAvatar.mjs";

// Initial call to display the single post card
displayUserData();

logOutButton.addEventListener("click", logout);

// Add an event listener to the form for the submit event
createListingForm.addEventListener("submit", createListing);

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const editAvatarForm = document.querySelector("#profile-image-form");
  editAvatarForm.addEventListener("submit", editAvatar);
});
