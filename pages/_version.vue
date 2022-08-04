<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
      <Header />

      <artisan-browser :version="this.version" />

      <app-footer />
    </div>
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
