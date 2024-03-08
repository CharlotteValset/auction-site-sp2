import { apiBaseUrl, registerUrl } from "../variables.mjs";

/**
 * Function to register a new user
 * @param {string} url The URL to which the registration request will be sent.
 * @param {Object} data The user data to be included in the registration request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response received from the server.
 * @example
 * const userData = {
 *   name: "John Doe",
 *   email: "john.doe@example.com",
 *   password: "securepassword123",
 *   avatar: "https://example.com/avatar.jpg",
 * };
 * registerUser("https://example.com/api/register", userData);
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
    console.log(postData);
    // Sending the fetch request to the specified URL with the provided data
    const response = await fetch(url, postData);

    console.log(response);
    // Parsing the response body as JSON

    const json = await response.json();
    console.log(json);
    // Alert for successful register

    const alertSuccessMessage = document.querySelector(".success-message");
    alertSuccessMessage.style.display = "block";

    // Redirect to the top of the page after successful register
    setTimeout(() => {
      window.location.href = "../../../log-in/";
    }, 3000);

    // Returning the parsed JSON data
    return json;
  } catch (error) {
    // Handling any errors that may occur during the fetch operation
    throw new Error(error, "Error happened");
  }
};

// Selecting the HTML form with the id "register-form"
const registerForm = document.querySelector("#register-form");

/**
 * Function to handle the form submission event and register a new user.
 * @param {Event} event The form submission event
 * @example
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
