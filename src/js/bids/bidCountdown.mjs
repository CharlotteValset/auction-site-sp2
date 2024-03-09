import { userCreditContainer } from "../pages/singleListing/singleListingPage.mjs";
import { addBidToListingForm } from "../bids/addBidToListing.mjs";

/**
 * Creates a countdown timer that calculates the remaining time until a specified end date
 * and updates a provided HTML element with the countdown display. Optionally, hides bid form
 * and user credit elements when the auction ends.
 *
 * @param {string} endDateString - The end date and time of the countdown (in string format).
 * @param {HTMLElement} countdownElement - The HTML element to display the countdown.
 * @param {boolean} [shouldHideBidFormAndCredit=false] - Optional flag to hide bid form and user credit elements when the auction ends.
 * @example
 * // Usage example:
 * const countdownElement = document.getElementById("countdown");
 * createCountdownTimer("2024-12-31T23:59:59", countdownElement, true);
 */
export function createCountdownTimer(
  endDateString,
  countdownElement,
  shouldHideBidFormAndCredit = false,
) {
  // Convert the end date string to a timestamp
  const endDate = new Date(endDateString).getTime();

  // Update the countdown at regular intervals
  const calculateRemainingTime = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    // Check if the auction has ended
    if (timeDifference <= 0) {
      clearInterval(calculateRemainingTime);
      countdownElement.innerText = "Auction ended";

      // Optionally hide bid form and user credit elements
      if (shouldHideBidFormAndCredit) {
        if (addBidToListingForm) {
          addBidToListingForm.style.display = "none";
        }
        if (userCreditContainer) {
          userCreditContainer.style.display = "none";
        }
      }
    } else {
      // Calculate days, hours, minutes, and seconds remaining
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Update the countdown display
      countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}
