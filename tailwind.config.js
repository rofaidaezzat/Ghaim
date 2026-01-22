/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1f52', // Deep Royal Blue
        secondary: '#f7e9cf', // Cream
        accent: '#F3F4F6', // Light Gray/White
      }
    },
  },
  plugins: [],
};
