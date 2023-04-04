<template>
  <a
    class="ml-5 text-gray-600 hover:text-artisan-light hover:underline block mb-1"
    @click="refreshCarbon"
    :href="`#${slug}`"
    :title="command.description"
    v-bind="$attrs"
  >
    {{ command.name }}
  </a>
</template>

<script>
export default {
  props: ['command'],
  computed: {
    slug() {
      return this.command.name.replace(':', '')
    },
  },
  methods: {
    refreshCarbon() {
      if (typeof _carbonads !== 'undefined') _carbonads.refresh()
    },
  },
}
</script>
