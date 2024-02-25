import { logout, logOutButton } from "../../auth/logout.mjs";
import {
  createListing,
  createListingForm,
} from "../../listings/addNewListing.mjs";
import { displayAllListings } from "../../listings/displayListings.mjs";
import { initialize } from "../../listings/searchListings.mjs";

// Initial call to display blog cards
displayAllListings();

// Call the initialize function to start the app
initialize();

logOutButton.addEventListener("click", logout);

// Add an event listener to the form for the submit event
createListingForm.addEventListener("submit", createListing);
