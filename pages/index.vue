<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
      <main>
        <div class="pb-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div class="flex-grow">
            <h3 class="text-lg sm:text-2xl leading-6 font-bold text-gray-900">
              <a href="/">Laravel Artisan Cheatsheet</a>
            </h3>
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
                ref="search"
                type="search"
                class="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none"
                placeholder="Search"
                tabindex="0"
                spellcheck="false"
                autocomplete="off"
                @input="handleFilter"
                @keypress.enter.prevent
              >
            </div>
          </form>

          <div class="w-full flex items-center justify-center my-8">
            <a href="https://www.producthunt.com/posts/laravel-artisan-cheatsheet?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-laravel-artisan-cheatsheet" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=281381&theme=light" alt="Laravel Artisan Cheatsheet - Shareable, bookmarkable cheatsheet for Laravel Artisan. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54"></a>
          </div>
        </div>

        <div class="space-y-8 my-8">
          <div v-if="commands.length == 0">
            <div class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center">
              <h1 class="text-xl font-bold text-indigo-900">
                No Commands Found
              </h1>
              <p>Nothing found for <code class="font-mono">{{ filter }}</code></p>
            </div>
          </div>

          <command v-for="command in commands" :key="command.name" :command="command" />
        </div>
      </main>
    </div>

    <app-footer />
  </div>
</template>

<script>
import data from '../assets/8.x.json'
const Mousetrap = require('mousetrap')

export default {
  data () {
    return {
      data: [],
      filter: ''
    }
  },
  computed: {
    commands () {
      if (!this.filter.length) {
        return this.data
      }

      const keyword = this.filter.toLowerCase()

      return this.data.filter((command) => {
        if (command.name.toLowerCase().includes(keyword) ||
                    command.synopsis.toLowerCase().includes(keyword) ||
                    command.description.toLowerCase().includes(keyword)) {
          return command
        }
        return []
      })
    }
  },
  created () {
    this.data = data
  },
  mounted () {
    Mousetrap.bind(['command+k', 'ctrl+k'], (event) => {
      this.$refs.search.focus()

      return false
    })
  },
  methods: {
    handleFilter (event) {
      this.filter = event.target.value
    }
  }
}
</script>
