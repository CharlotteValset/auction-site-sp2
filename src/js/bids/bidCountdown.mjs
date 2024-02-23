export function createCountdownTimer(endDateString, countdownElement) {
  const endDate = new Date(endDateString).getTime();

  const calculateRemainingTime = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      clearInterval(calculateRemainingTime);
      countdownElement.innerText = "Bid expired";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}
