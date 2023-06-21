/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#0E76BB',
        'brand-dark': '#E0E0E0',
      },
    },
  },
  plugins: [],
}