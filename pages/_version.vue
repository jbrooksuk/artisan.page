<template>
  <div>
    <commands v-if="data" :data="data" />
  </div>
</template>

<script>
import Commands from '../components/Commands.vue'
export default {
  components: { Commands },
  data() {
    return {
      data: null
    }
  },
  async asyncData ({ params }) {
    try {
      const data = await import(`../assets/${params.version}.json`)
      await new Promise(resolve => setTimeout(resolve, 1500))
      return {
        data: data.default
      }
    } catch (error) {
      return null
    }
  },
}
</script>
