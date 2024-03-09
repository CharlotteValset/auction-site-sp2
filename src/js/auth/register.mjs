import { apiBaseUrl, registerUrl } from "../variables.mjs";

/**
 * Registers a new user by sending a POST request to the specified URL with user data.
 *
 * @async
 * @param {string} url - The URL to which the registration request will be sent (including the base API URL).
 * @param {Object} data - The user data to be included in the registration request.
 * @returns {Promise<Object>} - A Promise that resolves to the parsed JSON response received from the server.
 * @throws {Error} - Throws an error if an issue occurs during the fetch operation.
 *
 * @example
 * // Usage example:
 * const userData = {
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   password: "securepassword123",
 *   avatar: "https://example.com/avatar.jpg",
 * };
 * try {
 *   const response = await registerUser("https://example.com/api/register", userData);
 *   // Handle successful registration response
 *   console.log(response);
 * } catch (error) {
 *   // Handle registration failure or fetch operation error
 *   console.error(error.message);
 * }
 */
const registerUser = async (url, data) => {
  try {
    // Creating an object to configure the fetch request
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Converting the user data to a JSON string and including it in the request body
      body: JSON.stringify(data),
    };
    // Sending the fetch request to the specified URL with the provided data
    const response = await fetch(url, postData);

    // Parsing the response body as JSON
    const json = await response.json();

    // Selecting alert elements for success and error messages
    const alertErrorMessage = document.querySelector(".alert-error-message");
    const alertSuccessMessage = document.querySelector(".success-message");

    if (json.errors) {
      // Displaying an error alert if the registration was unsuccessful
      alertErrorMessage.style.display = "block";
    } else {
      // Displaying a success alert and redirecting after a successful registration
      alertSuccessMessage.style.display = "block";
      alertErrorMessage.style.display = "none";

      setTimeout(() => {
        window.location.href = "../../../log-in/";
      }, 3000);

      // Returning the parsed JSON data
      return json;
    }
  } catch (error) {
    // Handling any errors that may occur during the fetch operation
    throw new Error(error, "Error happened");
  }
};

// Selecting the HTML form with the id "register-form"
const registerForm = document.querySelector("#register-form");

/**
 * Handles the form submission event, initiates the user registration process,
 * and clears input fields after the registration attempt.
 *
 * @param {Event} event - The form submission event.
 * @example
 * // Attach this function to the form's submit event
 * registerForm.addEventListener("submit", register);
 */
const register = (event) => {
  // Preventing the default form submission behavior to handle it manually
  event.preventDefault();

  // Destructuring the form elements to get values for name, email, and password
  const [name, email, password, avatar] = event.target.elements;

  // Creating a user object with the extracted values
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: avatar.value,
  };

  // Calling the registerUser function to send the user data to the server
  registerUser(`${apiBaseUrl}${registerUrl}`, user);

  // Clearing input fields
  name.value = "";
  email.value = "";
  password.value = "";
  avatar.value = "";
};

// Adding an event listener to the form to call the register function on form submission
registerForm.addEventListener("submit", register);
