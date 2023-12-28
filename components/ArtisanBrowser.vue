<template>
  <div>
    <div class="flex justify-center my-4 md:my-8">
      <div class="w-2/3">
        <Search :model-value="filter" @update:modelValue="filterResults" />
      </div>
    </div>

    <main>
      <div class="flex my-8 relative">
        <div class="hidden sticky top-20 overflow-y-auto h-screen md:block md:w-1/4 pr-4 space-y-4 scroll-mr-2 snap-y snap-start">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-500 snap-start scroll-m-4">
            Commands
            <span class="text-xs text-gray-500 dark:text-gray-200">
              ({{ commandData.length }})
            </span>
          </h2>

          <div v-for="(group, groupName) in commandLinks" :key="groupName" class="snap-start">
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

        <div class="w-full pr-0 md:pl-8">
          <div class="space-y-8">
            <div v-if="!commandData.length">
              <div
                class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center dark:bg-gray-800"
              >
                <p class="text-xl font-bold text-gray-900 dark:text-gray-300">
                  Loading...
                </p>
              </div>
            </div>
            <div v-else-if="commands.length === 0">
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
              :version="currentVersion"
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
import { laravel } from '../manifest.json'
import groupBy from 'lodash.groupby'

export default {
  props: {
    version: {
      type: String,
    },
  },
  data() {
    return {
      showBackToTop: false,
      currentVersion: null,
      commandData: [],
      filter: '',
    }
  },
  created() {
    this.currentVersion = this.version || laravel[0]
    this.loadData(this.currentVersion)
  },
  mounted() {
    const { query } = this.$route
    this.filter = query.search || ''

    document.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    commandData() {
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

      return this.commandData.filter((command) => {
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
      // Sort the commands into alphabetical order so that we can
      // display the 'ungrouped' commands at the top of the list.
      return Object.fromEntries(
        Object.entries(groupBy(this.commandData, (command) => {
          return command.name.includes(':')
            ? command.name.split(':')[0]
            : ''
        })).sort((a, b) => a[0] > b[0])
      )
    },
  },
  methods: {
    async loadData(version) {
      const commands = await import(`../assets/${version}.json`)
      this.commandData = commands.default
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
  },
}
</script>
