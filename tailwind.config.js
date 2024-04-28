/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // safelist classes will be always include in output file (don't change the order also)
  safelist: ["grid-cols-2"],
  theme: {
    extend: {},
    transitionProperty: {
      height: "height",
    },
    width: {
      inherit: "inherit",
      12: "12rem",
      13.5: "13.5rem",
      15: "15rem",
      20: "20rem",
      25: "25rem",
      full: "100%",
    },
  },
  plugins: [],
};
