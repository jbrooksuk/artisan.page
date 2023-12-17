<script setup>
import { laravel } from '~/manifest.json'
const route = useRoute()

useHead({
  title: laravel[0],
  titleTemplate: 'Laravel v%s - The Laravel Artisan Cheatsheet',
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <Breadcrumbs :pages="[]" />

    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 w-full xl:w-3/4 flex flex-col gap-8"
    >
      <ArtisanBrowser />

      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>
