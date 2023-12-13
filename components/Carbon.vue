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
  <div
    ref="carbonads"
    class="Carbon border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950"
  ></div>
</template>

<style>
.dark .Carbon .carbon-text {
  @apply text-gray-400 hover:text-gray-300;
}

.light .Carbon .carbon-text {
  @apply text-gray-600 hover:text-gray-800;
}

.Carbon {
  @apply p-3 flex flex-col max-w-full md:fixed md:right-4 md:bottom-4 md:w-40 mb-20 sm:mb-0;

  #carbonads span {
    @apply flex flex-col justify-between;

    .carbon-wrap {
      @apply flex flex-row flex-1 sm:flex-col;

      .carbon-img {
        @apply flex items-start justify-center mr-4 mb-0 sm:mb-4 lg:mr-0;
      }

      .carbon-text {
        @apply flex-1 text-sm w-full m-0 text-left block lg:ml-0;
      }
    }
  }

  img {
    @apply w-full rounded-sm;
  }

  & .carbon-poweredby {
    @apply ml-2 text-xs text-right text-gray-400 block pt-0 sm:pt-2 hover:no-underline hover:text-gray-500;
  }
}
</style>
