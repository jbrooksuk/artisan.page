<script setup>
useHead({
  title: useRoute().params.version,
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full xl:w-3/4">
      <ArtisanBrowser :version="$route.params.version" />

      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>
