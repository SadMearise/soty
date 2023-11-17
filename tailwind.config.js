/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#1ed760",
      white: "#ffffff",
      black: "#000000",
      dark: "#121212",
    },
    fontFamily: {
      sans: ["Noto Sans Mandaic", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
