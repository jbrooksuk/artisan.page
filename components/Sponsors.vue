<template>
  <div class="items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-8 hidden sm:flex">
    <a
      href="https://github.com/jbrooksuk/artisan.page?sponsor=1"
      title="Sponsor artisan.page"
      @click="sponsorClick"
      target="_blank"
    >
      <NuxtImg src="https://img.shields.io/github/sponsors/jbrooksuk?style=social&label=Sponsor%20artisan.page" class="h-6" alt="Sponsor artisan.page" />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    sponsorClick() {
      if (typeof window.fathom !== 'undefined') {
        window.fathom.trackGoal('L3DZXKHP', 0)
      }
    },
  },
}
</script>
