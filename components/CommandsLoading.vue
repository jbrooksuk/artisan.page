<template>
  <div class="space-y-0.5">
    <div
      v-for="(width, index) in widths"
      :key="index"
      class="h-[26px] flex items-center"
    >
      <div
        class="animate-pulse h-3 bg-gray-200 dark:bg-gray-800 rounded"
        :style="{ width: width + 'px' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      widths: this.generateRandomWidths(),
    }
  },
  methods: {
    generateRandomWidths() {
      const numberOfWidths = 20
      const randomWidths = []
      for (let i = 0; i < numberOfWidths; i++) {
        randomWidths.push(Math.floor(Math.random() * (180 - 60) + 60))
      }
      return randomWidths
    },
  },
}
</script>
