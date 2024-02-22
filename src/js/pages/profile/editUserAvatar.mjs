import { apiBaseUrl, profileUrl } from "../../variables.mjs";
import { fetchWithToken } from "../../auth/accesstoken.mjs";

const editAvatar = async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  const userProfileString = localStorage.getItem("userProfile");
  const userProfileObject = JSON.parse(userProfileString);
  const userName = userProfileObject.name;

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
      `${apiBaseUrl}${profileUrl}/${userName}/media`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editAvatarData),
      },
    );
    // Check if the response indicates a successful update
    if (response) {
      // Display a success message to the user
      alert("Your post is updated!");

      // Redirect to the user's profile page after successful update
      window.location.href = "/profile/";
    } else {
      // Display an error message if the update was not successful
      alert("Failed to update the post. Please try again.");
    }
  } catch (error) {
    // Throw an error with a detailed message if an error occurs during the update
    throw new Error("Error updating post:", error);
  }
};

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const editAvatarForm = document.querySelector("#profile-image-form");
  editAvatarForm.addEventListener("submit", editAvatar);
});
