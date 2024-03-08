import { apiBaseUrl, loginUrl } from "../variables.mjs";

/**
 * Function to login an existing user
 * @param {string} url The URL to which the login request will be sent.
 * @param {Object} data The user data to be included in the login request.
 * @returns {Promise<Object>} The function returns a Promise, when Promise is fulfilled, it provides the parsed JSON response recieved from the server.
 * @example
 * const loginData = { email: "example@email.com", password: "password123" };
 * loginUser("https://example.com/api/login", loginData);
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
 * Function to handle the form submission and initiates the logion process.
 * @param {Event} event The form submission event
 * @example
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
