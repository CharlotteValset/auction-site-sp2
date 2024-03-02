import { displayUserData } from "./displayUserData.mjs";
import { displayUserListings } from "../profile/displayUsersListings.mjs";
import { displayUserWins } from "./displayUserWins.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";
import {
  createListing,
  createListingForm,
} from "../../listings/addNewListing.mjs";
import { editAvatar } from "./editUserAvatar.mjs";

displayUserData();
displayUserWins();
displayUserListings();

createListingForm.addEventListener("submit", createListing);

const editAvatarForm = document.querySelector("#profile-image-form");
editAvatarForm.addEventListener("submit", editAvatar);

logOutButton.addEventListener("click", logout);
