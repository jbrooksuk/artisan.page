<template>
  <div>
    <a :id="slug" class="anchor"></a>
    <div
      class="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-2 dark:border-gray-600"
    >
      <div class="rounded-t-lg bg-gradient-to-r from-artisan to-artisan-light">
        <div class="bg-red-700 bg-opacity-40 p-4 px-8">
          <h1 class="text-lg md:text-xl font-bold text-white dark:text-gray-300">
            <NuxtLink :to="`/${version}/${slug}`">{{
              command.name
            }}</NuxtLink>
          </h1>
          <h2 class="text-sm font-normal text-white dark:text-gray-300 -mt-1">
            {{ command.description }}
          </h2>
        </div>
      </div>

      <div class="px-8 py-4 space-y-2" v-if="hasParams(command)">
        <div
          v-if="command.options.length"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <h3 class="font-bold text-lg">Options</h3>
          <ul class="list-disc list-outside space-y-1">
            <li v-for="option in commandOptions" :key="option.name">
              <code class="text-mono font-semibold">{{ option.name }}<span v-if="option.default" class="font-normal">={{ option.default}}</span></code> -
              {{ option.description }}

              <Badge :required="option.value_required" />
            </li>
          </ul>
        </div>

        <div
          v-if="command.arguments.length"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <h3 class="font-bold text-lg">Arguments</h3>
          <ul class="list-disc list-outside space-y-1">
            <li v-for="argument in command.arguments" :key="argument.name">
              <code class="text-mono">{{ argument.name }}</code> -
              {{ argument.description }}

              <Badge :required="argument.required" />
            </li>
          </ul>
        </div>

        <div
          v-if="extended && command.aliases.length"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <h3 class="font-bold text-lg">Aliases</h3>
          <p class="">This command may be aliased by the following:</p>
          <ul class="list-disc list-outside space-y-1">
            <li v-for="alias in command.aliases" :key="alias">
              <code class="text-mono">{{ alias }}</code>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="group relative overflow-hidden rounded-b-lg bg-gray-700 bg-opacity-10 dark:bg-gray-700"
      >
        <div class="flex items-center">
          <div class="flex-initial">
            <pre
              class="scrollbar-none overflow-hidden overflow-x-auto p-6 px-8 text-sm leading-snug text-gray-900 whitespace-pre-wrap dark:text-gray-300"
            >
php artisan {{ command.synopsis }}</pre
            >
          </div>
          <div class="pr-8 flex-1 text-right">
            <button
              type="button"
              class="group-hover:opacity-100 focus:opacity-100 opacity-0 text-gray-900 transition duration-200"
              :class="{ 'focus:outline-none': !keyboardUsed }"
              @click="copyCommand($event, `php artisan ${command.name}`)"
            >
              <span class="sr-only">Click to copy</span>
              <svg
                v-if="copied"
                class="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {copyToClipboard, dataSortBy} from "usemods";

export default {
  props: {
    version: String,
    command: Object,
    extended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyboardUsed: false,
      copied: false,
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 9) this.keyboardUsed = true
    })
  },
  computed: {
    commandOptions() {
      return dataSortBy(this.command.options, {
        property: 'name'
      })
    },
    slug() {
      return this.command.name.replace(':', '')
    },
  },
  methods: {
    hasParams(command) {
      return command.options.length || command.arguments.length || (this.extended && command.aliases.length)
    },
    async copyCommand(event, command) {
      this.copied = true

      copyToClipboard(command)

      await new Promise(resolve => setTimeout(resolve, 1500))

      this.copied = false
    },
  },
}
</script>

<style>
a[id].anchor {
  position: relative;
  display: block;
  visibility: hidden;
  top: -45px;
}
</style>
