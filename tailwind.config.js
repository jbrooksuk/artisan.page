const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/*.vue', './layouts/*.vue', './pages/*.vue'],
  darkMode: 'class',
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
  variants: {
    extend: {
      hidden: ['dark'],
      block: ['dark'],
      display: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
