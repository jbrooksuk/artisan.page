<template>
  <div>
    <commands :data="data" />
  </div>
</template>

<script>
import Commands from '../components/Commands.vue'
import supported from '../supported.json'

export default {
  components: { Commands },
  data() {
    return {
      data: null,
      supportedVersions: supported['laravel'],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = await import(`../assets/${this.supportedVersions[0]}.json`)
      this.data = data.default
    }
  }
}
</script>
