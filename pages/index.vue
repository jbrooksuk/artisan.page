<script setup>
import { laravel } from '~/manifest.json'
const route = useRoute()

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
})

useSeoMeta({
  title: laravel[0],
  titleTemplate: 'Laravel v%s - The Laravel Artisan Cheatsheet',

  description: `The Laravel ${laravel[0]} Artisan cheatsheet. Discover Laravel ${laravel[0]} php artisan commands.`,
  ogDescription: `The Laravel ${laravel[0]} Artisan cheatsheet. Discover Laravel ${laravel[0]} php artisan commands.`,
  twitterDescription: `The Laravel ${laravel[0]} Artisan cheatsheet. Discover Laravel ${laravel[0]} php artisan commands.`,
})
</script>

<template>
  <ArtisanBrowser />
</template>
