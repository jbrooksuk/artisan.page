<template>
  <div class="fixed right-3 bottom-3" v-show="scrollY > 300" @click="goToTop">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
         stroke="#4a5568"
         stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "BackgoToTop",
  data() {
    return {
      timeout: 0,
      scrollY: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.timeout) return;
      this.timeout = setTimeout(() => {
        this.scrollY = window.scrollY;
        clearTimeout(this.timeout);
        this.timeout = 0;
      }, 100);
    },
    goToTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
}
</script>

<style scoped>

</style>
