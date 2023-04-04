const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/*.vue', './layouts/*.vue', './pages/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        artisan: '#BB2926',
        'artisan-light': '#F26763',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
