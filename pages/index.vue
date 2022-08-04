<template>
  <div class="flex flex-col min-h-screen">
    <artisan-browser></artisan-browser>

    <app-footer />
  </div>
</template>

<script>
import manifest from '../manifest.json'

export default {
  head() {
    return {
      title: `${manifest['laravel'][0]}`,
      meta: [
        { hid: 'description', name: 'description', content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}` },
        { hid: 'twitter:description', name: 'twitter:description', content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}` },
        { hid: 'og:description', name: 'og:description', content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${manifest['laravel'][0]}` },
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
