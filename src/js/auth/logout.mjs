export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userProfile");

  location.href = "../../../index.html";
};

export const logOutButton = document.querySelector("#logout-button");
logOutButton.addEventListener("click", logout);
