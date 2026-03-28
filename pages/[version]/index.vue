<script setup>
const route = useRoute()
const version = route.params.version

const commandData = await import(`../../assets/${version}.json`)
const allCommands = commandData.default

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
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Laravel ${version} Artisan Commands`,
        description: `Complete list of php artisan commands for Laravel ${version}`,
        numberOfItems: allCommands.length,
        itemListElement: allCommands.slice(0, 50).map((cmd, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `php artisan ${cmd.name}`,
          url: `https://artisan.page/${version}/${cmd.name.replace(':', '')}`,
        })),
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
  ogImage: 'https://artisan.page/og.png',
  ogUrl: `https://artisan.page/${version}/`,
  twitterTitle: `Laravel ${version} Artisan Cheatsheet - artisan.page`,
  twitterDescription: `The Laravel ${version} Artisan cheatsheet. Discover Laravel ${version} php artisan commands.`,
  twitterImage: 'https://artisan.page/og.png',
})
</script>

<template>
  <ArtisanBrowser :version="$route.params.version" />
</template>
