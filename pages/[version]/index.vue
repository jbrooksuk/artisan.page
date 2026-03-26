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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://artisan.page',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Laravel ${version}`,
            item: `https://artisan.page/${version}/`,
          },
        ],
      }),
    },
  ],
})

useSeoMeta({
  title: version,
  titleTemplate: 'Laravel v%s - The Laravel Artisan Cheatsheet',

  description: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
  ogTitle: `Laravel ${version} Artisan Cheatsheet - artisan.page`,
  ogDescription: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
  ogUrl: `https://artisan.page/${version}/`,
  twitterTitle: `Laravel ${version} Artisan Cheatsheet - artisan.page`,
  twitterDescription: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
})
</script>

<template>
  <ArtisanBrowser :version="$route.params.version" />
</template>
