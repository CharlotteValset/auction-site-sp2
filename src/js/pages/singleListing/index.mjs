import { token } from "../../auth/accesstoken.mjs";
import { isLoggedIn, isLoggedOut } from "../../auth/isUserLoggedIn.mjs";
import {
  displaySingleListingsData,
  displayUserCredit,
  displayBidHistory,
  removeCreditAndAddBidIfUserIsSeller,
} from "./singleListingPage.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";
import {
  addBidToListingForm,
  addBidToListing,
} from "../../bids/addBidToListing.mjs";
import {
  createListingForm,
  createListing,
} from "../../listings/addNewListing.mjs";

displaySingleListingsData();
displayUserCredit();
removeCreditAndAddBidIfUserIsSeller();
displayBidHistory();

const loggedInElement = document.querySelector("#userIsLoggedIn");
const loggedOutElement = document.querySelector("#userNotLoggedIn");
const notLoggedInNavBar = document.querySelectorAll(".isNotLoggedIn");
const isLoggedInNavBar = document.querySelectorAll(".isLoggedIn");

isLoggedIn(token, loggedInElement);
isLoggedOut(token, loggedOutElement);

isLoggedInNavBar.forEach((element) => {
  isLoggedIn(token, element);
});
notLoggedInNavBar.forEach((element) => {
  isLoggedOut(token, element);
});

// Event listener to the form for the submit event
createListingForm.addEventListener("submit", createListing);

// Event listener to the form for the submit event
addBidToListingForm.addEventListener("submit", addBidToListing);

logOutButton.addEventListener("click", logout);
