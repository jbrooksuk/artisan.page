<template>
  <div>
    <nav>
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex gap-x-2 items-center">
          <div class="flex-1 w-full">
            <label for="current-version" class="sr-only">Laravel Version</label>
            <select
              name="current-version"
              id="current-version"
              v-model="currentVersion"
              class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
            >
              <option
                v-for="version in manifest.laravel"
                :value="version"
                :key="version"
              >
                Laravel {{ version }}
              </option>
            </select>
          </div>
          <div>
            <ThemePicker />
          </div>
        </div>

        <div class="flex-1 w-full">
          <Search :model-value="filter" @update:modelValue="filterResults" />
        </div>

        <span
          class="font-semibold font-heading text-gray-900 dark:text-gray-500"
          >Sponsored by
          <a
            href="https://cachethq.io/?ref=artisan.page"
            @click="sponsorClick"
            target="_blank"
            class="font-bold text-artisan hover:text-artisan-light"
            >Cachet
          </a>
        </span>

        <div class="space-x-2 hidden md:flex">
          <a
            href="https://twitter.com/jbrooksuk"
            class="text-artisan hover:text-artisan-light"
            title="Follow @jbrooksuk on Twitter"
          >
            <TwitterIcon class="h-6 w-6 fill-current" />
          </a>

          <a
            href="https://github.com/jbrooksuk/artisan.page"
            class="text-artisan hover:text-artisan-light"
            title="GitHub Project"
          >
            <GitHubIcon class="h-6 w-6 fill-current" />
          </a>
        </div>
      </div>
    </nav>

    <main>
      <div class="flex my-8">
        <div class="hidden md:block md:w-1/4 pr-4 space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-500">
            Available Commands
            <span class="text-xs text-gray-500 dark:text-gray-200">
              ({{ this.data.length }})
            </span>
          </h2>

          <div v-for="(group, groupName) in commandLinks" :key="groupName">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-500">
              {{ groupName }}
              <span
                v-if="groupName !== ''"
                class="text-xs text-gray-500 dark:text-gray-200"
              >
                ({{ group.length }})
              </span>
            </h3>

            <CommandLink
              v-for="command in group"
              :key="command.name"
              :command="command"
              class="text-sm"
            />
          </div>
        </div>

        <div class="w-full">
          <div class="space-y-8">
            <div v-if="!data.length">
              <div
                class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center dark:bg-gray-800"
              >
                <p class="text-xl font-bold text-gray-900 dark:text-gray-300">
                  Loading...
                </p>
              </div>
            </div>
            <div v-else-if="commands.length == 0">
              <div
                class="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-2 dark:border-gray-200"
              >
                <div class="px-8 py-4">
                  <h1
                    class="text-xl font-bold text-gray-900 dark:text-gray-300"
                  >
                    No Commands Found
                  </h1>
                  <p class="dark:text-gray-300">
                    Nothing found for
                    <code class="font-mono font-bold">{{ filter }}</code>
                  </p>
                </div>
              </div>
            </div>

            <Command
              v-for="command in commands"
              :key="command.name"
              :command="command"
            />
          </div>
        </div>
      </div>
    </main>

    <div
      class="fixed left-5 bottom-5 bg-gray-900 text-white text-center p-5 cursor-pointer rounded-md border-2 dark:border dark:border-gray-400 dark:hover:border-gray-500"
      title="Back to top"
      @click="backToTop"
      v-show="showBackToTop"
    >
      👆
    </div>
  </div>
</template>

<script>
import manifest from '../manifest.json'
import TwitterIcon from '~/components/Icons/TwitterIcon.vue'
import GitHubIcon from '~/components/Icons/GitHubIcon.vue'

export default {
  components: { GitHubIcon, TwitterIcon },
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
    this.filter = query.search || ''

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
    filterResults(value) {
      this.filter = value.trim()
    },
    sponsorClick() {
      if (typeof window.fathom !== 'undefined') {
        window.fathom.trackGoal('L3DZXKHP', 0)
      }
    },
  },
}
</script>
