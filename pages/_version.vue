<template>
  <div>
    <commands v-if="data" :data="data" />
  </div>
</template>

<script>
import Commands from '../components/Commands.vue'
export default {
  components: { Commands },
  async asyncData ({ params }) {
    try {
      const data = await import(`../assets/${params.version}.json`)
      return {
        data: data.default
      }
    } catch (error) {
      return null
    }
  },
}
</script>
