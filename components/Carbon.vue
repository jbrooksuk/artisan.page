<script setup>
const carbonads = ref(null)

onMounted(() => {
  if (carbonads.value) {
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('type', 'text/javascript')
    script.setAttribute(
      'src',
      'https://cdn.carbonads.com/carbon.js?serve=CEAIP27N&placement=artisanpage&format=cover'
    )
    script.setAttribute('id', '_carbonads_js')
    carbonads.value.appendChild(script)
  }
})
</script>

<template>
  <div
    ref="carbonads"
    class="Carbon"
    style="min-height: 280px;"
  ></div>
</template>

<style>
.Carbon {
  @apply p-3 max-w-full flex flex-col items-center justify-center;

  .carbon-wrap {
    @apply flex flex-row items-start gap-4;
  }

  .carbon-img {
    @apply shrink-0;

    img {
      @apply rounded-sm;
    }
  }

  .carbon-text {
    @apply flex-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300;
  }

  .carbon-poweredby {
    @apply block text-xs text-right text-gray-400 hover:text-gray-500 hover:no-underline mt-3;

    a {
      @apply text-gray-400 hover:text-gray-500 hover:no-underline;
    }
  }
}
</style>
