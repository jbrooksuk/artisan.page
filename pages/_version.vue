<template>
  <div class="flex flex-col min-h-screen">
    <artisan-browser :version="this.version" />

    <app-footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.version}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${this.version}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${this.version}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `A bookmarkable, searchable cheatsheet for Laravel's PHP Artisan commands in v${this.version}`,
        },
      ],
    }
  },
  async asyncData({ params }) {
    const version = params.version

    return { version }
  },
}
</script>
