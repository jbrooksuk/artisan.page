<template>
  <div class="items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-8 hidden sm:flex">
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
    <a
      href="https://invoicing.to/?ref=artisan.page"
      title="Invoicing.to"
      @click="sponsorClick"
      target="_blank"
      class="font-bold text-artisan hover:text-artisan-light"
    >
      <img src="~/assets/sponsors/invoicing-to.svg" class="h-8 dark:hidden" />
      <img
        src="~/assets/sponsors/invoicing-to-dark.svg"
        class="h-8 hidden dark:block"
      />
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
