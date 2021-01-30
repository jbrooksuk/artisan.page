<template>
  <div>
    <h1>{{ this.slug }}</h1>
    <p>Path: {{ $route.path }}</p>
  </div>
</template>
<script>
  export default {
    async asyncData({ params }) {
      const slug = params.version
      return { slug }
    },
  }
</script>
