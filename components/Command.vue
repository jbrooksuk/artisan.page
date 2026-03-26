<template>
  <div class="border-b border-gray-200 dark:border-gray-800" :data-command="command.name">
    <a :id="slug" class="anchor"></a>
    <div class="px-4 md:px-8 py-10 max-w-3xl mx-auto w-full">
      <!-- Command name and description -->
      <div class="flex flex-col gap-1 mb-5">
        <h1 class="font-mono font-bold text-xl text-artisan-accent leading-[26px]">
          <NuxtLink :to="`/${version}/${slug}`">{{ command.name }}</NuxtLink>
        </h1>
        <p class="text-[13px] text-gray-700 dark:text-gray-400 leading-5">
          {{ command.description }}
        </p>
      </div>

      <!-- Terminal block -->
      <div class="bg-gray-950 rounded-lg p-1 pb-1 mb-5">
        <div class="flex items-center justify-between px-3 py-1">
          <span class="text-gray-500 text-xs leading-5">Terminal</span>
          <button
            type="button"
            class="text-gray-500 hover:text-gray-400 transition"
            @click="copyCommand($event, `php artisan ${command.name}`)"
            :title="copied ? 'Copied!' : 'Copy command'"
          >
            <svg v-if="copied" class="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <svg v-else class="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          </button>
        </div>
        <div class="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-5 overflow-x-auto scrollbar-none">
          <code class="font-mono text-[13px] leading-5 whitespace-nowrap"><span class="text-[#e8514f]">php artisan</span>{{ ' ' }}<span class="text-[#74d4ff]">{{ command.name }}</span><template v-if="synopsisArgs">{{ ' ' }}<span class="text-[#cad5e2]">{{ synopsisArgs }}</span></template></code>
        </div>
      </div>

      <!-- Options -->
      <div v-if="command.options.length" class="mb-5">
        <h3 class="font-sans font-medium text-sm text-gray-950 dark:text-gray-300 leading-5 mb-3">
          Options
        </h3>
        <div class="flex flex-col">
          <div
            v-for="(option, index) in commandOptions"
            :key="option.name"
            class="flex flex-col gap-0.5 py-3"
            :class="{
              'border-t border-gray-200 dark:border-gray-800': true,
            }"
          >
            <div class="flex items-center gap-2">
              <span class="font-mono font-semibold text-[13px] text-artisan-accent leading-5">
                {{ formatOptionName(option.name) }}
              </span>
              <Badge :required="option.value_required" />
            </div>
            <p class="text-[13px] text-gray-700 dark:text-gray-400 leading-5">
              {{ option.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Arguments -->
      <div v-if="command.arguments.length">
        <h3 class="font-sans font-medium text-sm text-gray-950 dark:text-gray-300 leading-5 mb-3">
          Arguments
        </h3>
        <div class="flex flex-col">
          <div
            v-for="argument in command.arguments"
            :key="argument.name"
            class="flex flex-col gap-0.5 py-3 border-t border-gray-200 dark:border-gray-800"
          >
            <div class="flex items-center gap-2">
              <span class="font-mono font-semibold text-[13px] text-artisan-accent leading-5">
                {{ argument.name }}
              </span>
              <Badge :required="argument.required" />
            </div>
            <p class="text-[13px] text-gray-700 dark:text-gray-400 leading-5">
              {{ argument.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Aliases (extended view only) -->
      <div v-if="extended && command.aliases.length" class="mt-5">
        <h3 class="font-sans font-medium text-sm text-gray-950 dark:text-gray-300 leading-5 mb-3">
          Aliases
        </h3>
        <div class="flex flex-col">
          <div
            v-for="alias in command.aliases"
            :key="alias"
            class="py-3 border-t border-gray-200 dark:border-gray-800"
          >
            <span class="font-mono text-[13px] text-artisan-accent leading-5">
              {{ alias }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard, dataSortBy } from 'usemods'

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
      copied: false,
    }
  },
  computed: {
    commandOptions() {
      return dataSortBy(this.command.options, {
        property: 'name',
      })
    },
    slug() {
      return this.command.name.replace(':', '')
    },
    synopsisArgs() {
      // Extract everything after the command name from the synopsis
      const parts = this.command.synopsis.split(' ')
      // Remove the command name (first part)
      parts.shift()
      return parts.join(' ')
    },
  },
  methods: {
    formatOptionName(name) {
      // Strip leading dashes for display
      return name.replace(/^-+/, '')
    },
    async copyCommand(event, command) {
      this.copied = true
      copyToClipboard(command)
      await new Promise((resolve) => setTimeout(resolve, 1500))
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
