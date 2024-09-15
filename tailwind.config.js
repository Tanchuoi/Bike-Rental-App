// tailwind.config.js
const classnames = require("tailwindcss-classnames");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths as necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [classnames()],
};
