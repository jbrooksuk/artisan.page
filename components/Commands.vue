<template>
<div class="space-y-8 my-8">
      <div v-if="commands.length === 0 && filter.length">
          <div class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center">
              <h1 class="text-xl font-bold text-indigo-900">No Commands Found</h1>
              <p>Nothing found for <code class="font-mono">{{ filter }}</code></p>
          </div>
      </div>
      <div v-else-if="commands.length === 0">
          <div class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center">
              <h1 class="text-xl font-bold text-indigo-900">Loading...</h1>
              <p>Please wait a moment while the commands are loaded.</p>
          </div>
      </div>

      <command v-for="command in commands" :key="command.name" :command="command" />
  </div>
</template>

<script>
const Mousetrap = require('mousetrap');

export default {
  props: ['data'],
  data () {
      return {
          filter: '',
      }
  },
  computed: {
    commands () {
      if (!this.data) {
        return []
      }
      const keyword = this.filter.toLowerCase()

      return this.data.filter((command) => {
        if (command.name.toLowerCase().includes(keyword) ||
          command.synopsis.toLowerCase().includes(keyword) ||
          command.description.toLowerCase().includes(keyword)) {
          return command
        }
      })
    }
  },
  mounted() {
    $nuxt.$on('filter', (filter) => {
      this.filter = filter
    })
  },
}
</script>
