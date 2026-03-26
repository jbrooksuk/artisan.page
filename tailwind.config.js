const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./components/*.vue', './layouts/*.vue', './pages/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        artisan: '#BB2926',
        'artisan-light': '#F26763',
        'artisan-accent': '#d3403e',
        gray: {
          50: '#fcfcfc',
          100: '#f5f5f5',
          200: '#ededed',
          300: '#e8e8e8',
          400: '#c7c7c7',
          500: '#8f8f8f',
          600: '#6f6f6f',
          700: '#4d4d4d',
          800: '#2a2a2a',
          900: '#1a1a1a',
          950: '#171717',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
