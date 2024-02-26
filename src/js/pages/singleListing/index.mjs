import { token } from "../../auth/accesstoken.mjs";
import { isLoggedIn, isLoggedOut } from "../../auth/isUserLoggedIn.mjs";
import {
  displaySingleListingsData,
  displayUserCredit,
  displayBidHistory,
} from "./singleListingPage.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";
import {
  addBidToListingForm,
  addBidToListing,
} from "../../bids/addBidToListing.mjs";

// Initial call to display the single post card
displaySingleListingsData();

// Initial call to display the single post card
displayUserCredit();

displayBidHistory();

const loggedInElement = document.querySelector("#userIsLoggedIn");
const loggedOutElement = document.querySelector("#userNotLoggedIn");
const notLoggedInNavBar = document.querySelectorAll(".isNotLoggedIn");
const isLoggedInNavBar = document.querySelectorAll(".isLoggedIn");
// Use the functions with specific elements and the access token
isLoggedIn(token, loggedInElement);
isLoggedOut(token, loggedOutElement);
isLoggedInNavBar.forEach((element) => {
  isLoggedIn(token, element);
});
notLoggedInNavBar.forEach((element) => {
  isLoggedOut(token, element);
});

// Add an event listener to the form for the submit event
addBidToListingForm.addEventListener("submit", addBidToListing);

logOutButton.addEventListener("click", logout);