// vite.config.js
import path from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "log-in/index.html"),
        signup: path.resolve(__dirname, "sign-up/index.html"),
        listing: path.resolve(__dirname, "listing/index.html"),
        profile: path.resolve(__dirname, "profile/index.html"),
        images: path.resolve(__dirname, "images/"),
      },
    },
  },
};
