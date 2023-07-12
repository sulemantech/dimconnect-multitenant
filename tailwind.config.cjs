/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{

      'laptop': '1284px',
      'laptop2':'1367px',
      'Mobile': '870px',
    },
    extend: {
      colors: {
        'brand': '#0E76BB',
        'brand-dark': '#E0E0E0',
      },
    },
    ripple: theme => ({
      colors: theme('colors'),
      modifierTransition: 'background 0.2',
      activeTransition: 'background 0.1s'
      
    }),
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
}