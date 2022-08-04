<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
    <nav>
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex-grow flex space-x-4 items-center">
          <h1
            class="text-lg sm:text-4xl leading-6 font-bold text-indigo-900 tracking-tighter dark:text-indigo-500"
          >
            <a href="/">Laravel Artisan Cheatsheet</a>
          </h1>
          <div>
            <label for="current-version" class="sr-only">Laravel Version</label>
            <select
              name="current-version"
              id="current-version"
              v-model="currentVersion"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
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
              <span
                class="font-semibold font-heading text-indigo-900 dark:text-indigo-500"
                >Made by
                <a
                  href="https://twitter.com/jbrooksuk"
                  target="_blank"
                  class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                  >@jbrooksuk</a
                ></span
              >
            </div>
            <div class="flex ml-3">
              <span
                class="font-semibold font-heading text-indigo-900 dark:text-indigo-500"
                >Sponsored by
                <a
                  href="https://snapshooter.com/?via=james&utm_source=artisancheatsheet&utm_medium=sponsor&utm_campaign=general"
                  target="_blank"
                  class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                  >SnapShooter Backups</a
                ></span
              >
            </div>
            <!-- <div class="ml-3">
              <a href="https://github.com/jbrooksuk/artisan.page">
                <img
                  src="https://img.shields.io/github/stars/jbrooksuk/artisan.page?style=social"
                />
                <span class="sr-only">Star on GitHub</span>
              </a>
            </div> -->
            <theme-picker />
          </div>
        </div>
      </div>
    </nav>
    <main>
      <div class="mt-2">
        <form class="w-full flex md:ml-0">
          <label for="search_field" class="sr-only">Search</label>

          <div
            class="relative text-gray-400 focus-within:text-gray-600 min-w-full"
          >
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
              class="placeholder-gray-400 block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
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

      <div class="flex my-8">
        <div class="hidden md:block md:w-1/4 pr-4">
          <div class="carbon-ads mb-4">
            <script
              async
              type="text/javascript"
              src="//cdn.carbonads.com/carbon.js?serve=CEAIP27N&placement=artisanpage"
              id="_carbonads_js"
            ></script>
          </div>

          <h2 class="text-xl font-bold text-indigo-900 dark:text-indigo-500">
            Available Commands
          </h2>

          <div v-for="(group, groupName) in commandLinks" class="mb-2">
            <h3
              class="text-lg font-semibold text-indigo-900 dark:text-indigo-500"
            >
              {{ groupName }}
            </h3>

            <command-link
              v-for="command in group"
              :key="command.name"
              :command="command"
              class="text-sm"
            />
          </div>
        </div>

        <div class="w-full md:w-3/4">
          <div class="space-y-8">
            <div v-if="!data.length">
              <div
                class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center dark:bg-gray-800"
              >
                <p class="text-xl font-bold text-indigo-900 dark:text-gray-300">
                  Loading...
                </p>
              </div>
            </div>
            <div v-else-if="commands.length == 0">
              <div
                class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center dark:bg-gray-800"
              >
                <h1
                  class="text-xl font-bold text-indigo-900 dark:text-gray-300"
                >
                  No Commands Found
                </h1>
                <p class="dark:text-gray-300">
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
        </div>
      </div>
    </main>

    <div
      class="fixed right-5 bottom-5 bg-gray-900 text-white text-center p-5 cursor-pointer rounded-md border-2 dark:border dark:border-indigo-400 dark:hover:border-indigo-500"
      title="Back to top"
      @click="backToTop"
      v-show="showBackToTop"
    >
      👆
    </div>
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
      showBackToTop: false,
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
    Mousetrap.bind(['command+k', 'ctrl+k', '/'], event => {
      this.$refs.search.focus()

      return false
    })
    document.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    currentVersion(newVersion, oldVersion) {
      if (newVersion && !manifest.laravel.includes(newVersion)) {
        this.$nuxt.error({
          statusCode: 404,
          message: `Laravel version ${newVersion} not found.`,
        })
      }

      if (oldVersion === null) {
        return
      }

      if (newVersion !== oldVersion) {
        if (typeof window.fathom !== 'undefined') {
          window.fathom.trackGoal('QUL7QUJP', 0)
        }

        this.$router.push({
          path: `/${newVersion}/`,
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

      if (!keyword) {
        return Object.values(this.commandLinks).flat()
      }

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
    commandLinks() {
      let commandLinks = {}

      this.data.forEach(command => {
        const groupName = command.name.includes(':')
          ? command.name.split(':')[0]
          : ''

        if (commandLinks[groupName] === undefined) {
          commandLinks[groupName] = []
        }

        commandLinks[groupName].push(command)
      })

      // Sort the commands into alphabetical order so that we can
      // display the 'ungrouped' commands at the top of the list.
      return Object.fromEntries(
        Object.entries(commandLinks).sort((a, b) => a[0] > b[0])
      )
    },
  },
  methods: {
    async loadData(version) {
      const data = await import(`../assets/${version}.json`)
      this.data = data.default
    },
    handleScroll() {
      const rootElement = document.documentElement
      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight

      this.showBackToTop = rootElement.scrollTop / scrollTotal > 0.05
    },
    backToTop() {
      document.documentElement.scroll({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
