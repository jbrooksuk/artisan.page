<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
    <main>
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex-grow flex space-x-4 items-center">
          <h3 class="text-lg sm:text-2xl leading-6 font-bold text-gray-900">
            <a href="/">Laravel Artisan Cheatsheet</a>
          </h3>
          <div>
            <label for="current-version" class="sr-only">Laravel Version</label>
            <select
              name="current-version"
              id="current-version"
              v-model="currentVersion"
              class="
                block
                w-full
                pl-2
                pr-10
                py-1
                text-base
                border border-gray-400
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                sm:text-sm
                rounded-md
              "
            >
              <option
                v-for="version in manifest.laravel"
                :value="version"
                :key="version"
              >
                {{ version }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex-grow">
          <div class="flex justify-end items-center flex-row">
            <div class="flex">
              <span class="font-semibold font-heading"
                >Made by
                <a
                  href="https://twitter.com/jbrooksuk"
                  target="_blank"
                  class="
                    font-bold
                    bg-clip-text
                    text-transparent
                    bg-gradient-to-r
                    from-blue-400
                    to-purple-600
                  "
                  >@jbrooksuk</a
                ></span
              >
            </div>
            <div class="ml-3">
              <a href="https://github.com/jbrooksuk/artisan.page">
                <img
                  src="https://img.shields.io/github/stars/jbrooksuk/artisan.page?style=social"
                />
                <span class="sr-only">Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-2">
        <form class="w-full flex md:ml-0">
          <label for="search_field" class="sr-only">Search</label>

          <div
            class="relative text-gray-400 focus-within:text-gray-600 min-w-full"
          >
            <div
              class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
              "
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414   1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <input
              id="text"
              v-model.trim="filter"
              @keypress.enter.prevent
              type="search"
              class="
                py-3
                px-4
                bg-white
                placeholder-gray-400
                text-gray-900
                rounded-lg
                shadow-md
                appearance-none
                w-full
                block
                pl-12
                focus:outline-none
              "
              placeholder="Search"
              tabindex="0"
              spellcheck="false"
              autocomplete="off"
              ref="search"
              autofocus="true"
            />
          </div>
        </form>
      </div>

      <div class="space-y-8 my-8">
        <div v-if="!data.length">
          <div
            class="
              rounded-xl
              shadow-lg
              overflow-hidden
              bg-white
              p-10
              text-center
            "
          >
            <p class="text-xl font-bold text-indigo-900">Loading...</p>
          </div>
        </div>
        <div v-else-if="commands.length == 0">
          <div
            class="
              rounded-xl
              shadow-lg
              overflow-hidden
              bg-white
              p-10
              text-center
            "
          >
            <h1 class="text-xl font-bold text-indigo-900">No Commands Found</h1>
            <p>
              Nothing found for <code class="font-mono">{{ filter }}</code>
            </p>
          </div>
        </div>

        <command
          v-for="command in commands"
          :key="command.name"
          :command="command"
        />
      </div>
    </main>
  </div>
</template>

<script>
const Mousetrap = require('mousetrap')
import manifest from '../manifest.json'

export default {
  props: {
    version: {
      type: String,
    },
  },
  data() {
    return {
      manifest: manifest,
      currentVersion: null,
      data: [],
      filter: '',
    }
  },
  created() {
    this.currentVersion = this.version || manifest['laravel'][0]
    this.loadData(this.currentVersion)
  },
  mounted() {
    const { query } = this.$route
    this.$refs.search.value = this.filter = query.search || ''
    Mousetrap.bind(['command+k', 'ctrl+k'], event => {
      this.$refs.search.focus()

      return false
    })
  },
  watch: {
    currentVersion(newVersion, oldVersion) {
      if (newVersion && ! manifest.laravel.includes(newVersion)) {
        this.$nuxt.error({statusCode: 404, message: `Laravel version ${newVersion} not found.`})
      }

      if (oldVersion === null) {
        return
      }

      if (newVersion !== oldVersion) {
        this.$router.push({
          path: newVersion,
          hash: window.location.hash,
        })
      }
    },
    data() {
      window.location.hash &&
        this.$nextTick(() => {
          document.querySelector(window.location.hash).scrollIntoView({
            behavior: 'auto',
          })
        })
    },
  },
  computed: {
    commands() {
      const keyword = this.filter.toLowerCase()

      return this.getCommands(keyword)
    },
  },
  methods: {
    getCommands(keyword) {
      return this.data.filter(command => {
        if (
          command.name.toLowerCase().includes(keyword) ||
          command.synopsis.toLowerCase().includes(keyword) ||
          command.description.toLowerCase().includes(keyword)
        ) {
          return command
        }
      })
    },
    async loadData(version) {
      const data = await import(`../assets/${version}.json`)
      this.data = data.default
    },
  },
}
</script>
