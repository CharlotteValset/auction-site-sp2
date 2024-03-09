/**
 * Formats a timestamp into a human-readable date string.
 * @param {string} timestamp - The timestamp to be formatted.
 * @returns {string} - The formatted date string.
 * @example
 * const timestamp = "2023-04-15T12:30:00Z";
 * const formattedDate = formatDateString(timestamp);
 */
export const formatDateString = (timestamp) => {
  // Array of month in numbers
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  //Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the day, month and year components
  const day = String(date.getDate()).padStart(2, "0");
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const year = String(date.getFullYear()).slice(-2);

  // Assemble the formatted date string
  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};
