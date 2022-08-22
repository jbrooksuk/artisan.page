<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
      <artisan-browser></artisan-browser>
      <carbon />
    </div>

    <app-footer />
  </div>
</template>

<script>
import manifest from '../manifest.json'

export default {
  head() {
    return {
      title: `${manifest['laravel'][0]}`,
      link: [
        {
          rel: 'canonical',
          href: 'https://artisan.page' + this.$route.path,
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}`,
        },
      ],
    }
  },
  computed: {
    currentVersion() {
      return manifest[0]
    },
  },
}
</script>
