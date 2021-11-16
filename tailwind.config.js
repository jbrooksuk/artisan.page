const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/*.vue', './layouts/*.vue', './pages/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
