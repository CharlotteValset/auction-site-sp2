import { apiBaseUrl, loginUrl } from "../variables.mjs";

/**
 * Logs in an existing user by sending a POST request to the specified URL with user data.
 *
 * @async
 * @param {string} url - The URL to which the login request will be sent (including the base API URL).
 * @param {Object} data - The user data to be included in the login request.
 * @returns {Promise<Object>} - A Promise that resolves to the parsed JSON response received from the server.
 * @throws {Error} - Throws an error if an issue occurs during the fetch operation.
 *
 * @example
 * // Usage example:
 * const loginData = { email: "example@email.com", password: "password123" };
 * try {
 *   const response = await loginUser("https://example.com/api/login", loginData);
 *   // Handle successful login response
 *   console.log(response);
 * } catch (error) {
 *   // Handle login failure or fetch operation error
 *   console.error(error.message);
 * }
 */
const loginUser = async (url, data) => {
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

    if (json.accessToken) {
      // Storing the accessToken into local storage
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);

      // Storing the user profile info into local storage
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          name: json.name,
          email: json.email,
          avatar: json.avatar,
          banner: json.banner,
        }),
      );

      // Redirect to the feed page after successful login
      window.location.href = "../../../index.html";

      // Returning the parsed JSON data
      return json;
    } else {
      // Alert message for unsuccessful login
      const alertMessage = document.querySelector(".alert-message");
      alertMessage.style.display = "block";
    }
  } catch (error) {
    // Handling errors that may occur during the fetch operation
    throw new Error(`An error occurred: ${error.message}`);
  }
};

//Selecting the HTML form with the id "login-form"
const loginForm = document.querySelector("#login-form");

/**
 * Handles the form submission event, initiates the asynchronous login process,
 * and clears input fields after a successful login attempt.
 *
 * @param {Event} event - The form submission event.
 * @example
 * // Attach this function to the form's submit event
 * loginForm.addEventListener("submit", login);
 */
const login = (event) => {
  // Preventing default form submission behavior to handle it manually
  event.preventDefault();
  // Destructuring the form elements to get value for email and password
  const [email, password] = event.target.elements;

  // Creating a user object with the extracted values
  const user = {
    email: email.value,
    password: password.value,
  };

  // Calling the loginUser function to send the user data to the server
  loginUser(`${apiBaseUrl}${loginUrl}`, user);

  // Clearing input fields
  email.value = "";
  password.value = "";
};

// Adding an event listener to the form to call the loginUser function on form submission
loginForm.addEventListener("submit", login);
