<template>
  <div class="items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-8 hidden sm:flex">
    <a
      href="https://github.com/sponsors/jbrooksuk"
      title="Sponsor James Brooks"
      @click="sponsorClick"
      target="_blank"
      class="text-artisan hover:text-artisan-light text-sm font-bold"
    >
      Sponsor Artisan.page on GitHub
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
