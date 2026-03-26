<script setup>
const route = useRoute()
const version = route.params.version

definePageMeta({
  validate: async(route) => {
    return /^[\d\.x]+$/.test(route.params.version)
  }
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
})

useSeoMeta({
  title: version,
  titleTemplate: 'Laravel v%s - The Laravel Artisan Cheatsheet',

  description: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
  ogDescription: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
  twitterDescription: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
})
</script>

<template>
  <ArtisanBrowser :version="$route.params.version" />
</template>
