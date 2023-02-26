/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        900: "#ffffff",
        800: "rgb(103 232 249)",
        700: "rgb(225 29 72)",
        600: "rgb(64 64 64)",
        500: "rgb(24 24 27)",
        400: "rgba(34, 49, 63,1)",
        300: "rgb(22 78 99)",
        200: "rgb(8 145 178)",
        100: "#F0FFFF",
      },
      fontFamily: {
        sans: ["Ubuntu", "serif"],
      },
    },
  },
  plugins: [],
};
