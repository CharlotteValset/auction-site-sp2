import { apiBaseUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken, token } from "../../auth/accesstoken.mjs";

export const editAvatar = async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  const userProfileString = localStorage.getItem("userProfile");
  const userProfileObject = JSON.parse(userProfileString);
  const userName = userProfileObject.name;

  const URL = `${apiBaseUrl}${profileUrl}${userName}/media`;
  console.log("URL:", URL);

  // Get form input values
  const avatarUrl = event.target.querySelector("#profile-image-url");
  console.log(avatarUrl);
  // Create an object with edited post data
  const editAvatarData = {
    avatar: avatarUrl.value,
  };
  console.log(editAvatarData);

  try {
    // Send a PUT request to update the post
    const response = await fetchWithToken(
      `${apiBaseUrl}${profileUrl}${userName}/media`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editAvatarData),
      },
    );
    console.log("response:", response);
    // Check if the response indicates a successful update
    if (response.errors) {
      // Display an error message if the update was not successful
      alert("Failed to update the image. Please try again.");
    } else {
      // Redirect to the user's profile page after successful update
      window.location.href = "/profile/";
    }
  } catch (error) {
    // Throw an error with a detailed message if an error occurs during the update
    throw new Error("Error updating image:", error);
  }
};

/* // Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const editAvatarForm = document.querySelector("#profile-image-form");
  editAvatarForm.addEventListener("submit", editAvatar);
}); */
