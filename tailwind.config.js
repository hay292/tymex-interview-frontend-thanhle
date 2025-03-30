/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        drone: ['"Drone Ranger Pro"', "sans-serif"],
      },
      colors: {
        customBg: "#1A1A1D",
        neutralBorder: "#3A3841",
      },
    },
  },
  plugins: [],
};
