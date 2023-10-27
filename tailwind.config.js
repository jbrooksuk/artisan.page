const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./components/*.vue', './layouts/*.vue', './pages/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        artisan: '#BB2926',
        'artisan-light': '#F26763',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
