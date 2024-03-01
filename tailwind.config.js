/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.{html,js,mjs}",
    "./**/*.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "light-grey": "#F5F5F5",
        "green-primary": "#1D7671",
        "green-primary-hover": "#009C93",
        "darkest-grey": "#444444",
        "medium-grey": "#A5A5A5",
        "lighter-grey": "#BBBBBB",
        "almost-white": "#FEFEFE",
        "medium2-grey": "#6B7280",
      },
      screens: {
        sm: "378px",
        // => @media (min-width: 576px) { ... }
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
