<script setup>
const route = useRoute()
const version = route.params.version

definePageMeta({
  validate: async(route) => {
    return /^[\d\.x]+$/.test(route.params.version)
  }
})

useHead({
  title: version,
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
      <ArtisanBrowser :version="$route.params.version" />

      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>
