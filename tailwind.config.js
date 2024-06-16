/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      green: {
        100: "#1ed760",
        200: "#1db954",
      },
      white: "#ffffff",
      black: "#000000",
      grey: {
        100: "#a7a7a7",
        200: "#878787",
        300: "#f0f0f0",
        400: "#b3b3b3",
        500: "#727272",
      },
      dark: {
        100: "#121212",
        200: "#282828",
        300: "#181818",
        400: "#292929",
      },
      blue: "#0288d1",
      orange: "#f57c00",
      red: "#d32f2f",
    },
    animation: {
      slidedown: "slidedown 1s ease-in-out",
      firstScale: "scale 1s infinite alternate",
      secondScale: "scale 1s infinite alternate ",
      thirdScale: "scale 1s infinite alternate 0.5s",
      fourthScale: "scale 1s infinite alternate 0.75s",
      shake: "shake 0.6s ease-in-out",
      firstBounce: "bounce 1s infinite",
      secondBounce: "bounce 1s infinite 0.25s",
      thirdBounce: "bounce 1s infinite 0.5s",
    },
    keyframes: {
      slidedown: {
        from: { opacity: 0, transform: "translateY(-15%)" },
        to: { opacity: 1, transform: "none" },
      },
      scale: {
        "0%, 100%": { transform: "scaleY(1)" },
        "50%": { transform: "scaleY(1.5)" },
      },
      shake: {
        "0%": { transform: "translateX(0)" },
        "20%": { transform: "rotate(-5deg) translateX(-5%)" },
        "40%": { transform: "rotate(5deg) translateX(5%)" },
        "60%": { transform: "rotate(-2deg) translateX(-5%)" },
        "80%": { transform: "rotate(2deg) translateX(5%)" },
        "100%": { transform: "translateX(0)" },
      },
      bounce: {
        "0%, 100%": { transform: "translateY(-25%)", "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)" },
        "50%": { transform: "translateY(0)", "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)" },
      },
    },
    boxShadow: {
      primary: "0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2)",
      secondary: "0 8px 8px rgba(0, 0, 0, 0.3)",
      tertiary: "0 8px 24px rgba(0, 0, 0, 0.5)",
      quaternary: "0 4px 60px rgba(0, 0, 0, 0.5)",
    },
    screens: {
      "sm-min": { min: "468.98px" },
      "sm-max": { max: "468.98px" },
      "xsm-min": { min: "539.98px" },
      "xsm-max": { max: "539.98px" },
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
      "3xl-min": { min: "2047.98px" },
      "3xl-max": { max: "2047.98px" },
    },
    fontFamily: {
      sans: ["Noto Sans Mandaic", "sans-serif"],
    },
    scale: {
      default: "1.04",
    },
    extend: {
      gridTemplateAreas: {
        layout: ["left-sidebar main-view", "now-playing-bar now-playing-bar"],
      },
    },
  },
};
