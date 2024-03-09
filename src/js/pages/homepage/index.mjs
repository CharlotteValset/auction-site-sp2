import { token } from "../../auth/accesstoken.mjs";
import { isLoggedIn, isLoggedOut } from "../../auth/isUserLoggedIn.mjs";
import {
  createListing,
  createListingForm,
} from "../../listings/addNewListing.mjs";
import { displayAllListings } from "../../listings/displayListings.mjs";
import { initialize } from "../../listings/searchListings.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";

const notLoggedInNavBar = document.querySelectorAll(".isNotLoggedIn");
const isLoggedInNavBar = document.querySelectorAll(".isLoggedIn");

isLoggedInNavBar.forEach((element) => {
  isLoggedIn(token, element);
});
notLoggedInNavBar.forEach((element) => {
  isLoggedOut(token, element);
});

displayAllListings();

if (token) {
  createListingForm.addEventListener("submit", createListing);
}

initialize();

logOutButton.addEventListener("click", logout);
