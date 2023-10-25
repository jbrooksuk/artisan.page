<script setup>
const carbonads = ref(null)

onMounted(() => {
  if (carbonads.value) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute(
      'src',
      'https://cdn.carbonads.com/carbon.js?serve=CEAIP27N&placement=artisanpage'
    )
    script.setAttribute('id', '_carbonads_js')
    carbonads.value.appendChild(script)
  }
})
</script>

<template>
  <div ref="carbonads"></div>
</template>
