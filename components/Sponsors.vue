<template>
  <article class="my-4">
    <div class="text-center mb-2">
      <p class="text-gray-700 dark:text-gray-300 text-sm font-bold">
        Sponsored by
      </p>
    </div>
    <div class="flex items-center justify-center gap-8">
      <a
        href="https://cachethq.io/?ref=artisan.page"
        title="Cachet — The Open-Source Status Page System"
        @click="sponsorClick"
        target="_blank"
        class="font-bold text-artisan hover:text-artisan-light"
      >
        <img src="~/assets/sponsors/cachet.svg" class="h-8 dark:hidden" />
        <img
          src="~/assets/sponsors/cachet-dark.svg"
          class="h-8 hidden dark:block"
        />
      </a>
      <a
        href="https://checkmango.com/?ref=artisan.page"
        title="Checkmango — The Full-Stack A/B Testing Platform"
        @click="sponsorClick"
        target="_blank"
        class="font-bold text-artisan hover:text-artisan-light"
      >
        <img src="~/assets/sponsors/checkmango.svg" class="h-8 dark:hidden" />
        <img
          src="~/assets/sponsors/checkmango-dark.svg"
          class="h-8 hidden dark:block"
        />
      </a>
    </div>
  </article>
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
