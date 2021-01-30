export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Laravel Artisan Cheatsheet',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },

      { hid: "twitter:card", name: 'twitter:card', content: "summary_large_image" },
      { hid: "twitter:site", name: 'twitter:site', content: "@jbrooksuk" },
      { hid: "og:site_name", name: 'og:site_name', content: "Laravel Artisan Cheatsheet" },
      { hid: "og:type", name: 'og:type', content: "website" },
      { hid: "og:title", name: 'og:title', content: "Laravel Artisan Cheatsheet" },
      { hid: "og:locale", name: 'og:locale', content: "en" },
      { hid: "og:url", name: 'og:url', content: "https://artisan.page" },
      { hid: "description", name: 'description', content: "Laravel Artisan Cheatsheet" },
      { hid: "og:description", name: 'og:description', content: "Laravel Artisan Cheatsheet" },
      { hid: "og:image", name: 'og:image', content: "https://banners.beyondco.de/artisan.page.png?theme=light&packageManager=composer+require&packageName=laravel%2Flaravel&pattern=cage&style=style_1&description=Laravel+Artisan+Cheatsheet&md=1&showWatermark=0&fontSize=100px&images=https%3A%2F%2Flaravel.com%2Fimg%2Flogomark.min.svg" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://artisan.page' }
    ],
    script: [
      {
        hid: 'fathom',
        src: 'https://cdn.usefathom.com/script.js',
        site: 'FMUFNTYW',
        spa: 'auto',
        defer: 'defer',
        once: true,
        skip: process.env.NODE_ENV !== 'production'
      },
      {
        hid: 'github',
        src: 'https://buttons.github.io/buttons.js',
        defer: 'defer',
        once: true,
        async: true,
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    }
  }
}
