<template>
  <div class="relative flex items-center">
    <label for="search" class="sr-only">Search</label>
    <input
      ref="search"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search..."
      @keypress.enter.prevent
      type="text"
      name="search"
      id="search"
      class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
      v-bind="$attrs"
    />
    <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
      <kbd
        class="inline-flex items-center rounded border border-gray-200 dark:border-gray-700 px-1 font-sans text-xs text-gray-400"
        >{{ shortcutModifier }}K</kbd
      >
    </div>
  </div>
</template>

<script>
const Mousetrap = require('mousetrap')

export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  mounted() {
    Mousetrap.bind(['meta+k', 'ctrl+k', '/'], event => {
      this.$refs.search.focus()

      return false
    })
  },
  methods: {
    focus() {
      this.$refs.search.focus()
    },
  },
  computed: {
    isMacOs() {
      return (
        typeof window !== 'undefined' &&
        window.navigator.appVersion.indexOf('Mac') !== -1
      )
    },
    shortcutModifier() {
      return this.isMacOs ? '⌘' : 'Ctrl+'
    },
    fullShortcutModifier() {
      return this.isMacOs ? 'Command' : 'Control'
    },
  },
}
</script>
