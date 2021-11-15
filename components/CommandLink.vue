<template>
  <div>
    <a
      class="text-gray-700 hover:text-indigo-900 hover:underline"
      :href="`#${slug}`"
    >
      {{ command.name }}
    </a>
  </div>
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
