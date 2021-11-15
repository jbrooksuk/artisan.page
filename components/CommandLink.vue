<template>
  <div>
    <a
      class="ml-5 text-gray-700 hover:text-indigo-900 hover:underline inline-block mb-1"
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
