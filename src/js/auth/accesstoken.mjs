// Getting accessToken from localStorage
export const token = localStorage.getItem("accessToken");

// Creating an object to include the accessToken in the request headers
export const getData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

/**
 * Fetches data from the specified URL with an access token.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options=getData] - The options for the fetch request.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response.
 * @throws {Error} - Throws an error if an issue occurs during the fetch operation.
 * @example
 * const apiUrl = `${apiBaseUrl}${postsAPI}`;
 * try {
 *   const data = await fetchWithToken(apiUrl);
 * } catch (error) {
 *   throw new Error(message, error);
 * }
 */
export const fetchWithToken = async (url, options = getData) => {
  try {
    // Fetch a response with the specified URL and the accessToken
    const response = await fetch(url, options);

    // Parse the response body as JSON
    const json = await response.json();
    // Handle errors that may occur during the fetch operation
    return json;
  } catch (error) {
    // Rethrow the error with a more informative message
    throw new Error("An error occurred during the fetch operation", error);
  }
};
