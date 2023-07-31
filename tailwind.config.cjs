/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      screens:{

        'laptop': '1284px',
        'laptop1': '1270px',
        'laptop2':'1367px',
        'Mobile': '870px',
      },
      colors: {
        'brand': '#0E76BB',
        'brand-dark': '#0C3957',
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