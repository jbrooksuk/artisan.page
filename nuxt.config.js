const laravelManifest = require('./manifest').laravel

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Laravel v%s - Laravel Artisan Cheatsheet',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "A bookmarkable, searchable cheatsheet for Laravel's default PHP Artisan commands.",
      },
      { hid: 'theme-color', name: 'theme-color', content: '#111827' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@jbrooksuk' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Laravel Artisan Cheatsheet',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          "A bookmarkable, searchable cheatsheet for Laravel's default PHP Artisan commands.",
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://artisan.page/og.png',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Laravel Artisan Cheatsheet',
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Laravel Artisan Cheatsheet',
      },
      { hid: 'og:locale', name: 'og:locale', content: 'en' },
      { hid: 'og:url', name: 'og:url', content: 'https://artisan.page' },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          "A bookmarkable, searchable cheatsheet for Laravel's default PHP Artisan commands.",
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://artisan.page/og.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@1,400,700,900&display=swap',
      },
    ],
    script: [
      {
        hid: 'fathom',
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'FMUFNTYW',
        'data-canonical': false,
        defer: 'defer',
        once: true,
        skip: process.env.NODE_ENV !== 'production',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-trailingslash-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    '@nuxtjs/redirect-module',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    async routes() {
      return laravelManifest.map(version => ({
        route: `/${version}`,
        payload: {
          version: version,
        },
      }))
    },
  },

  router: {
    trailingSlash: true,
  },

  redirect: [
    {
      from: '^.*(?<!/)$',
      to: (from, req) => req.url + '/',
    },
  ],

  sitemap: {
    hostname: 'https://artisan.page',
    gzip: true,
    // routes: [
    //   '/6.x',
    //   '/7.x',
    //   '/8.x',
    //   '/9.x',
    // ],
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
}
