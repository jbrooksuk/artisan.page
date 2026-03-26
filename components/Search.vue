<template>
  <div class="relative flex items-center">
    <label for="search" class="sr-only">Search commands</label>
    <div class="relative flex-1">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <svg class="size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <input
        ref="search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search commands"
        @keypress.enter.prevent
        type="text"
        name="search"
        id="search"
        class="block w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 pl-8 pr-12 text-xs text-gray-950 dark:text-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none"
        v-bind="$attrs"
      />
      <ClientOnly>
        <div class="absolute inset-y-0 right-0 flex items-center pr-1.5">
          <kbd
            class="inline-flex items-center rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans text-xs text-gray-500"
          >{{ shortcutModifier }}K</kbd>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import Mousetrap from 'mousetrap'

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
        window.navigator.userAgent.indexOf('Mac') !== -1
      )
    },
    shortcutModifier() {
      return this.isMacOs ? '⌘' : 'Ctrl+'
    },
  },
}
</script>
