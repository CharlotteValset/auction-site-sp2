// Return the remaining time as an object
/*     return { days, hours, minutes }; */

/*  // Update the countdown every second
  const intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const bidExpiresContainer = document.querySelector("#bidExpiresCountdown");

    // Check if the container element exists
    if (bidExpiresContainer) {
      // Log the endDateString to the console for debugging

      // Calculate the remaining time
      const remainingTime = calculateRemainingTime();

      // Check if the remaining time is available
      if (remainingTime !== null) {
        // Display the remaining time in the specified HTML element
        bidExpiresContainer.innerText = `${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m`;
      } else {
        // If the remaining time is not available, clear the interval and display the expired message
        clearInterval(intervalId);
        bidExpiresContainer.innerText = "Countdown expired!";
      }
    } else {
      console.error("Element with ID 'bidExpiresCountdown' not found.");
      // Clear the interval even if the container element is not found
      clearInterval(intervalId);
    }
  } */
/* 
const bidExpiresContainer = document.querySelector("#bidExpiresCountdown");

export function createCountdownTimer(endDateString) {
  // Parse the endsAt date from the listing
  const endDate = new Date(endDateString).getTime();

  const calculateRemainingTime = setInterval(() => {
    const now = new Date().getTime();

    // Compare today and endsAt
    const timeDifference = endDate - now;

    // Set up the countdown timer
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    bidExpiresContainer.setProperty("--value", days);
    bidExpiresContainer.setProperty("--value", hours);
    bidExpiresContainer.setProperty("--value", minutes);

    // Fallback for if the timer has run out
    if (timeDifference < 0) {
      clearInterval(calculateRemainingTime);
      bidExpiresContainer.innerHTML = "Bid expired";
    }
  }, 1000);
}
 */

export function createCountdownTimer(endDateString) {
  console.log("Script executed");
  const bidExpiresContainer = document.querySelector("#bidExpiresCountdown");

  if (!bidExpiresContainer) {
    console.error("Element with ID 'bidExpiresCountdown' not found.");
    return;
  }

  const endDate = new Date(endDateString).getTime();

  const calculateRemainingTime = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    // Sets the content of the element
    bidExpiresContainer.innerHTML = `${days}d ${hours}h ${minutes}m`;

    if (timeDifference < 0) {
      clearInterval(calculateRemainingTime);
      bidExpiresContainer.innerHTML = "Bid expired";
    }
  }, 1000);
}
