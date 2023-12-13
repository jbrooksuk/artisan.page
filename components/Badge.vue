<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium uppercase"
    :class="{
      'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': required,
      'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300':
        !required,
    }"
  >
    <template v-if="required">Required</template>
    <template v-else>Optional</template>
  </span>
</template>

<script>
export default {
  props: {
    required: Boolean,
  },
}
</script>
