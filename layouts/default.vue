<script setup>
import { laravel, packages } from '../manifest.json'

useHead({
  title: laravel[0],
  meta: [
    { name: 'theme-color', content: '#d3403e' },
    { name: 'twitter:domain', content: 'artisan.page' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Artisan.page',
        alternateName: 'The Laravel Artisan Cheatsheet',
        url: 'https://artisan.page',
        description: "A searchable, bookmarkable cheatsheet for Laravel's Artisan commands.",
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://artisan.page/?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
})

useSeoMeta({
  title: 'The Laravel Artisan Cheatsheet',
  description: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  keywords: ['laravel', ...laravel.map(version => `laravel ${version}`), 'artisan', 'cheatsheet', 'cheat sheet', 'commands', 'cli', 'php', ...packages.map(pkg => pkg.split('/').join(' '))].join(', '),

  ogDescription: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  ogImage: 'https://artisan.page/og.png',
  ogTitle: 'The Laravel Artisan Cheatsheet',
  ogType: 'website',
  ogSiteName: 'Artisan.page',
  ogUrl: 'https://artisan.page',

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
    <slot />
  </div>
</template>
