import {
  displaySingleListingsData,
  displayUserCredit,
} from "./singleListingPage.mjs";
import { logout, logOutButton } from "../../auth/logout.mjs";

// Initial call to display the single post card
displaySingleListingsData();

// Initial call to display the single post card
displayUserCredit();

logOutButton.addEventListener("click", logout);
