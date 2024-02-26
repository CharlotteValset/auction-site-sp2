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

// Initial call to display blog cards
displayAllListings();

// Call the initialize function to start the app
initialize();

logOutButton.addEventListener("click", logout);

// Add an event listener to the form for the submit event
if (token) {
  createListingForm.addEventListener("submit", createListing);
}
