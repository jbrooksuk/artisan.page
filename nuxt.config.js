import { laravel as versions } from './manifest.json'
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Laravel Artisan Cheatsheet',
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
          "A bookmarkable, searchable cheatsheet for all of Laravel's default Artisan commands.",
      },
      { hid: 'theme-color', name: 'theme-color', content: '#312e81' },
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
          "A bookmarkable, searchable cheatsheet for all of Laravel's default Artisan commands.",
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://banners.beyondco.de/artisan.page.png?theme=light&packageManager=composer+require&packageName=laravel%2Flaravel&pattern=cage&style=style_1&description=Laravel+Artisan+Cheatsheet&md=1&showWatermark=0&fontSize=100px&images=https%3A%2F%2Flaravel.com%2Fimg%2Flogomark.min.svg',
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
          "A bookmarkable, searchable cheatsheet for all of Laravel's default Artisan commands.",
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://banners.beyondco.de/artisan.page.png?theme=light&packageManager=composer+require&packageName=laravel%2Flaravel&pattern=cage&style=style_1&description=Laravel+Artisan+Cheatsheet&md=1&showWatermark=0&fontSize=100px&images=https%3A%2F%2Flaravel.com%2Fimg%2Flogomark.min.svg',
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
    '@nuxtjs/axios',
  ],

  nitro: {
    plugins: ['~/server/plugins/cors'],
    prerender: {
      routes: [],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
    extend(config) {
      config.module?.rules.push({
        test: /\.[cm]?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      })
    },
  },

  generate: {
    routes() {
      return new Promise(resolve => {
        resolve(
          versions.map(version => ({
            route: `/${version}`,
            payload: {
              version: version,
            },
          }))
        )
      })
    },
  },

  router: {
    trailingSlash: false,
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
