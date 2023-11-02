const laravelManifest = require('./manifest').laravel

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  site: {
    url: 'https://artisan.page',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: 'Laravel v%s - Laravel Artisan Cheatsheet',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'https://artisan.page/favicon.ico',
        },
        {
          rel: 'style',
          href: 'https://fonts.bunny.net/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap',
        },
      ],
      script: [
        process.env.NODE_ENV === 'production' && {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'FMUFNTYW',
          'data-canonical': false,
          defer: 'defer',
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'tailwindcss/nesting': {},
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    // '@nuxtjs/redirect-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-simple-sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    async routes() {
      return laravelManifest.map(version => ({
        route: `/${version}/`,
        payload: {
          version: version,
        },
      }))
    },
  },

  router: {
    trailingSlash: true,
  },

  sitemap: {
    urls: async () => {
      return laravelManifest.map(version => ({
        url: `/${version}/`,
        changefreq: 'weekly',
        priority: 1,
      }))
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
})
