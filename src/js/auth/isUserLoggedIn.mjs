/**
 * Show or hide an element based on the presence of a token.
 * If the token is present, the element is displayed; otherwise, it is hidden.
 * @param {string|null} token - The user's authentication token.
 * @param {HTMLElement} element - The HTML element to show or hide.
 */ export const isLoggedIn = (token, element) => {
  // Display the element if a token is present, hide it otherwise
  if (token) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};

/**
 * Show or hide an element based on the absence of a token.
 * If the token is absent, the element is displayed; otherwise, it is hidden.
 * @param {string|null} token - The user's authentication token.
 * @param {HTMLElement} element - The HTML element to show or hide.
 */
export const isLoggedOut = (token, element) => {
  // Display the element if no token is present, hide it otherwise
  if (!token) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};
