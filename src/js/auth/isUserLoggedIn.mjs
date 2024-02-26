export const isLoggedIn = (token, element) => {
  if (token) {
    element.style.display = "block";
  } else {
    element.remove();
  }
};

export const isLoggedOut = (token, element) => {
  if (!token) {
    element.style.display = "block";
  } else {
    element.remove();
  }
};
