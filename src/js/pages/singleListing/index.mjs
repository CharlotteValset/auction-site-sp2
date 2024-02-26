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

// Add an event listener to the form for the submit event
addBidToListingForm.addEventListener("submit", addBidToListing);

logOutButton.addEventListener("click", logout);
