<script setup>
import manifest from '../manifest.json'

useHead({
  title: manifest.laravel[0],
})

useSeoMeta({
  title: 'Laravel Artisan Cheatsheet',
  description: () =>
    `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands.`,

  ogDescription: () =>
    `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands.`,
  ogImage: 'https://artisan.page/og.png',
  ogTitle: 'Laravel Artisan Cheatsheet',
  ogType: 'website',

  twitterCreator: '@jbrooksuk',
  twitterDescription: () =>
    `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands.`,
  twitterSite: '@jbrooksuk',
  twitterImage: 'https://artisan.page/og.png',
  twitterTitle: 'Laravel Artisan Cheatsheet',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
