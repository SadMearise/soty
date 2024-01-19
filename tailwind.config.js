/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      green: "#1ed760",
      white: "#ffffff",
      "white-50": "#f6f6f6",
      black: "#000000",
      grey: {
        100: "#a7a7a7",
        200: "#878787",
        300: "#f0f0f0",
      },
      dark: {
        100: "#121212",
        200: "#282828",
      },
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
    boxShadow: {
      default: "0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2)",
      secondary: "0 8px 8px rgba(0, 0, 0, 0.3)",
    },
    screens: {
      "sm-min": { min: "468.98px" },
      "sm-max": { max: "468.98px" },
      "md-min": { min: "767.98px" },
      "md-max": { max: "767.98px" },
      "xmd-min": { min: "991.98px" },
      "xmd-max": { max: "991.98px" },
      "lg-min": { min: "1279.98px" },
      "lg-max": { max: "1279.98px" },
      "xl-min": { min: "1535.98px" },
      "xl-max": { max: "1535.98px" },
      "2xl-min": { min: "1919.98px" },
      "2xl-max": { max: "1919.98px" },
    },
    fontFamily: {
      sans: ["Noto Sans Mandaic", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
