/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Vite HTML
    "./src/**/*.{js,jsx,ts,tsx}",         // all files in src
    "./pages/**/*.{js,jsx,ts,tsx}",       // pages folder
    "./components/**/*.{js,jsx,ts,tsx}",  // components folder
    "./contents/**/*.{js,jsx,ts,tsx}"     // contents folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};