<template>
  <a
    class="
      ml-5
      text-gray-600
      hover:text-gray-900 hover:underline
      block
      mb-1
    "
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
}
</script>
