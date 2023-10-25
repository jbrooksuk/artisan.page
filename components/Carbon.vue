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
  <div ref="carbonads" class="Carbon border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"></div>
</template>

<style>
.dark .Carbon .carbon-text {
  @apply text-gray-400 hover:text-gray-200;
}

.light .Carbon .carbon-text {
  @apply text-gray-600 hover:text-gray-800;
}

.Carbon {
  @apply p-3;
  @apply p-3 flex flex-col max-w-full md:fixed md:right-4 md:bottom-4 md:w-40;

  #carbonads span {
    @apply flex flex-col justify-between;

    .carbon-wrap {
      @apply flex flex-row sm:flex-col flex-1;

      @apply lg:flex-col;

      .carbon-img {
        @apply flex items-start justify-center mb-4;

        /*@media (min-width: 320px) {
          @apply mb-0;
        }*/

        @apply lg:mb-4;
      }

      .carbon-text {
        @apply flex-1 text-sm w-full m-0 text-left block;

        &:hover {
          @apply no-underline;
        }

        /*@media (min-width: 320px) {
          @apply ml-4;
        }*/

        @apply lg:ml-0;
      }
    }
  }

  img {
    @apply w-full;
  }

  & .carbon-poweredby {
    @apply ml-2 text-xs text-right text-gray-400 block pt-2;

    &:hover {
      @apply no-underline text-gray-500;
    }
  }
}
</style>
