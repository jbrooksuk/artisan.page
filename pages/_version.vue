<template>
  <div class="flex flex-col min-h-screen">
    <artisan-browser :version="this.version" />

    <app-footer />
  </div>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const version = params.version

      return { version }
    }
  }
</script>
