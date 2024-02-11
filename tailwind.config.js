/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,mjs}",
    "./*.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "light-grey": "#F5F5F5",
        "green-primary": "#1D7671",
        "green-primary-hover": "#009C93",
        "darkest-grey": "#444444",
        "lighter-grey": "#BBBBBB",
        "almost-white": "#FEFEFE",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
