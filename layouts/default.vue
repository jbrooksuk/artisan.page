<script setup>
import { laravel, packages } from '../manifest.json'

useHead({
  title: laravel[0],
})

defineRobotMeta()

useSeoMeta({
  title: 'The Laravel Artisan Cheatsheet',
  description: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  keywords: ['laravel', ...laravel.map(version => `laravel ${version}`), 'artisan', 'cheatsheet', 'cheat sheet', 'commands', 'cli', 'php', ...packages.map(pkg => pkg.split('/').join(' '))].join(', '),

  ogDescription: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  ogImage: 'https://artisan.page/og.png',
  ogTitle: 'The Laravel Artisan Cheatsheet',
  ogType: 'website',

  twitterCreator: '@jbrooksuk',
  twitterDescription: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  twitterSite: '@jbrooksuk',
  twitterImage: 'https://artisan.page/og.png',
  twitterTitle: 'The Laravel Artisan Cheatsheet',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <RobotMeta />

    <slot />
  </div>
</template>
