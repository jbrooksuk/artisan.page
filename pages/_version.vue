<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
      <ArtisanBrowser :version="this.version" />
      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.version}`,
      link: [
        {
          rel: 'canonical',
          href: 'https://artisan.page' + this.$route.path,
        },
      ],
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
