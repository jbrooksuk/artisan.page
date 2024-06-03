<template>
  <div class="space-y-3">
    <div v-for="(width, index) in widths" :key="index" :class="`animate-pulse h-2.5 bg-gray-300 rounded-full`"
      :style="{ width: width + 'px' }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      widths: this.generateRandomWidths(),
    };
  },
  methods: {
    generateRandomWidths() {
      // Generate an array of random widths between 0 and 90
      const numberOfWidths = 25;
      const randomWidths = [];
      for (let i = 0; i < numberOfWidths; i++) {
        randomWidths.push(Math.floor(Math.random() * (100 - 20) + 20)); // Random number between 20 and 90
      }
      return randomWidths;
    },
  },
};
</script>
