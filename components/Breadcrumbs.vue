<script setup>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid'
import TwitterIcon from './Icons/TwitterIcon.vue'
import VersionPicker from './VersionPicker.vue'

defineProps({
  pages: Array,
})
</script>

<template>
  <nav
    class="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 sticky top-0 z-10 shadow-md"
    aria-label="Breadcrumbs"
  >
    <ol
      role="list"
      class="flex items-center space-x-4 px-4 sm:px-6 lg:px-8"
    >
      <li>
        <NuxtLink href="/" class="text-gray-400 hover:text-gray-500">
          <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span class="sr-only">Home</span>
        </NuxtLink>
      </li>
      <li>
        <a href="https://james.brooks.page/blog/laravel-artisan-cheatsheet-api" class="text-gray-500 hover:text-gray-600 font-bold">API</a>
      </li>
      <li>
        <VersionPicker />
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <ChevronRightIcon
            class="h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <NuxtLink
            :href="page.href"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            >{{ page.name }}</NuxtLink
          >
        </div>
      </li>
    </ol>

    <Sponsors />

    <div class="flex items-center gap-4 px-4 sm:px-6 lg:px-8">
      <div class="gap-4 flex">
        <a
          href="https://tweet.new/?text=Check%20out%20artisan.page%20by%20%40jbrooksuk%20🤌"
          class="text-artisan hover:text-artisan-light hidden md:block"
          title="Tweet about artisan.page"
        >
          <TwitterIcon class="h-6 w-6 fill-current" />
        </a>
      </div>

      <ThemePicker />
    </div>
  </nav>
</template>
