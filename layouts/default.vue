<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
      <main>
        <div class="pb-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div class="flex-grow flex space-x-4 items-center">
              <h3 class="text-lg sm:text-2xl leading-6 font-bold text-gray-900">
                  <a href="/">Laravel Artisan Cheatsheet</a>
              </h3>
              <div>
                  <label for="current-version" class="sr-only">Location</label>
                    <select
                      name="current-version"
                      id="current-version"
                      v-model="currentVersion"
                      class="block w-full pl-2 pr-10 py-1 text-base border border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option
                          v-for="version in supportedVersions"
                          :key="version">
                            {{ version }}
                        </option>
                    </select>
                </div>
          </div>

          <div class="flex-grow">
            <div class="flex justify-end items-center flex-row">
              <div class="flex">
                <span class="font-semibold">Made by <a href="https://twitter.com/jbrooksuk" target="_blank" class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">@jbrooksuk</a></span>
              </div>
              <div class="ml-3 mt-2">
                <a class="github-button" href="https://github.com/jbrooksuk/artisan.page" data-icon="octicon-star" aria-label="Star jbrooksuk/artisan.page on GitHub">Star</a>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <form class="w-full flex md:ml-0">
            <label for="search_field" class="sr-only">Search</label>

            <div class="relative text-gray-400 focus-within:text-gray-600 min-w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414   1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
              </div>

              <input
                id="text"
                type="search"
                class="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none"
                placeholder="Search"
                tabindex="0"
                v-model="filter"
                @input="$nuxt.$emit('filter', $event.target.value)"
                spellcheck="false"
                autocomplete="off"
                ref="search"
                @keypress.enter.prevent
              >
            </div>
          </form>

          <div class="w-full flex items-center justify-center my-8">
            <a href="https://www.producthunt.com/posts/laravel-artisan-cheatsheet?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-laravel-artisan-cheatsheet" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=281381&theme=light" alt="Laravel Artisan Cheatsheet - Shareable, bookmarkable cheatsheet for Laravel Artisan. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54"></a>
          </div>
        </div>

        <Nuxt />
      </main>
    </div>

    <app-footer />
  </div>
</template>

<script>
const Mousetrap = require('mousetrap')
import supported from '../supported.json'

export default {
  data () {
    return {
      supportedVersions: supported['laravel'],
      currentVersion: '',
      filter: ''
    }
  },
  mounted () {
    this.currentVersion = $nuxt.$route.params.version ?? this.supportedVersions[0]

    Mousetrap.bind(['command+k', 'ctrl+k'], (event) => {
      this.$refs.search.focus()

      return false
    })
    this.$watch('currentVersion', (version) => {
      if (version == $nuxt.$route.params?.version) return
      this.$router.push({
          path: version == this.supportedVersions[0] ? '/' : version
      })
    })
  },
  methods: {
    handleFilter (event) {
      this.filter = event.target.value
    }
  }
}
</script>

<style>
body {
  @apply bg-gray-100 antialiased;
}
</style>
