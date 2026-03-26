<template>
  <a
    class="block font-mono text-xs leading-[26px] rounded-md px-2 -mx-2 transition-colors"
    :class="active
      ? 'bg-[#fbecec] dark:bg-artisan-accent/10 text-artisan-accent'
      : 'text-gray-700 dark:text-gray-400 hover:text-artisan-accent dark:hover:text-artisan-accent'"
    @click="handleCommandClick"
    :href="`#${slug}`"
    :title="command.description"
    v-bind="$attrs"
  >
    {{ command.name }}
  </a>
</template>

<script>
import { scrollToAnchor } from 'usemods'

export default {
  props: {
    command: Object,
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    slug() {
      return this.command.name.replace(':', '')
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
