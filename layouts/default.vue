<script setup>
import { laravel } from '../manifest.json'

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
        inLanguage: 'en',
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
  description: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  ogDescription: "The Laravel Artisan cheatsheet. Discover Laravel's php artisan commands.",
  ogImage: 'https://artisan.page/og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogTitle: 'The Laravel Artisan Cheatsheet',
  ogType: 'website',
  ogSiteName: 'Artisan.page',
  ogUrl: 'https://artisan.page',
  ogLocale: 'en_US',

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
