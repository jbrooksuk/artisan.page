<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-gray-100 antialiased;
}

html.dark body {
  @apply bg-gray-900;
}
</style>
