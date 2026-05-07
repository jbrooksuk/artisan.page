<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="sidebar-link block font-mono text-xs leading-[26px] rounded-md px-2 -mx-2"
    :class="active
      ? 'bg-[#fbecec] dark:bg-artisan-accent/10 text-artisan-accent'
      : 'text-gray-700 dark:text-gray-400 hover:text-artisan-accent dark:hover:text-artisan-accent'"
    :title="cleanDescription"
    v-bind="$attrs"
  >
    {{ command.name }}
  </NuxtLink>
  <a
    v-else
    class="sidebar-link block font-mono text-xs leading-[26px] rounded-md px-2 -mx-2"
    :class="active
      ? 'bg-[#fbecec] dark:bg-artisan-accent/10 text-artisan-accent'
      : 'text-gray-700 dark:text-gray-400 hover:text-artisan-accent dark:hover:text-artisan-accent'"
    @click="handleCommandClick"
    :href="`#${slug}`"
    :title="cleanDescription"
    v-bind="$attrs"
  >
    {{ command.name }}
  </a>
</template>

<script>
import { scrollToAnchor } from 'usemods'
import { stripConsole } from '~/utils/console-format'

export default {
  props: {
    command: Object,
    active: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
  },
  computed: {
    slug() {
      return this.command.name.replace(':', '')
    },
    cleanDescription() {
      return stripConsole(this.command.description)
    },
  },
  methods: {
    handleCommandClick() {
      scrollToAnchor(this.slug)
      this.refreshCarbon()
    },
    refreshCarbon() {
      if (typeof _carbonads !== 'undefined') _carbonads.refresh()
    },
  },
}
</script>
