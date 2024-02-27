export const isLoggedIn = (token, element) => {
  if (token) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};

export const isLoggedOut = (token, element) => {
  if (!token) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};
