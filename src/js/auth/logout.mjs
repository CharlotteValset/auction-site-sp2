/**
 * Logs out the current user by removing authentication information from local storage
 * and redirects to the home page.
 *
 * @example
 * // Usage example:
 * logout();
 */
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userProfile");
  // Redirecting to the home page after logging out
  location.href = "../../../index.html";
};

export const logOutButton = document.querySelector("#logout-button");
// Adding an event listener to the logout button to trigger the logout function on click
logOutButton.addEventListener("click", logout);
