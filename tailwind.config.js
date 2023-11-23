/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#1ed760",
      white: "#ffffff",
      "white-50": "#f6f6f6",
      black: "#000000",
      grey: "#a7a7a7",
      "grey-50": "#878787",
      dark: "#121212",
    },
    animation: {
      slidedown: "slidedown 1s ease-in-out",
    },
    keyframes: {
      slidedown: {
        from: { opacity: 0, transform: "translateY(-15%)" },
        to: { opacity: 1, transform: "none" },
      },
    },
    screens: {
      "md-min": { min: "767.98px" },
      "md-max": { max: "767.98px" },
    },
    fontFamily: {
      sans: ["Noto Sans Mandaic", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
