<template>
  <div>
    <commands :data="data" />
  </div>
</template>

<script>
import data from '../assets/8.x.json'
import Commands from '../components/Commands.vue'

export default {
  components: { Commands },
  data () {
    return { data }
  }
}
</script>
