<script setup>
import { laravel } from '~/manifest.json'

const props = defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 404, statusMessage: 'Not Found' }),
  },
})

const statusCode = computed(() => props.error?.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)
const heading = computed(() => isNotFound.value ? 'Command not found' : 'Something went wrong')
const message = computed(() => isNotFound.value
  ? "We couldn't find that page. The command may have been removed or never existed in this version."
  : props.error?.statusMessage || 'An unexpected error occurred.'
)
const latestVersion = laravel[0]

useSeoMeta({
  title: heading.value,
  titleTemplate: '%s | artisan.page',
  robots: 'noindex, follow',
  ogTitle: heading.value,
  ogDescription: message.value,
})

const handleHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
    <div class="max-w-lg w-full text-center">
      <p class="font-mono text-sm text-artisan-accent mb-3">{{ statusCode }}</p>
      <h1 class="font-sans font-semibold text-2xl text-gray-950 dark:text-gray-100 mb-3">
        {{ heading }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-sm leading-6 mb-8">
        {{ message }}
      </p>
      <div class="flex items-center justify-center gap-3">
        <button
          @click="handleHome"
          class="font-sans text-sm font-medium px-4 py-2 rounded-md bg-artisan-accent text-white hover:opacity-90 transition-opacity"
        >
          Go home
        </button>
        <NuxtLink
          :to="`/${latestVersion}`"
          class="font-sans text-sm font-medium px-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          Browse Laravel {{ latestVersion }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
