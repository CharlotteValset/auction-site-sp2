/**
 * Formats a timestamp into a human-readable time string.
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} - The formatted time string.
 * @example
 * const timestamp = "2023-04-15T12:30:00Z";
 * const formattedTime = formatTimeString(timestamp);
 */
export const formatTimeString = (timestamp) => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the hour and minute components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Assemble the formatted time string
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
