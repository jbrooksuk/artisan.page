<template>
  <div class="space-y-8">
    <div v-for="(index) in 3" :key="index">
      <div class="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-2 dark:border-gray-600">
        <div class="rounded-t-lg bg-gradient-to-r from-artisan to-artisan-light">
          <div class="bg-red-700 bg-opacity-40 p-4 px-8 space-y-2">
            <div class="animate-pulse h-3 bg-gray-300 rounded-full w-32" />
            <div class="animate-pulse h-3 bg-gray-300 rounded-full w-60" />
          </div>
        </div>

        <div class="px-8 py-4 space-y-3">
          <div class="animate-pulse h-3 bg-gray-300 rounded-full w-72" />
          <div class="animate-pulse h-3 bg-gray-300 rounded-full w-80" />
          <div class="animate-pulse h-3 bg-gray-300 rounded-full w-96" />
          <div class="animate-pulse h-3 bg-gray-300 rounded-full w-56" />
          <div class="animate-pulse h-3 bg-gray-300 rounded-full w-60" />
        </div>

        <div class="group relative overflow-hidden rounded-b-lg bg-gray-700 bg-opacity-10 dark:bg-gray-700">
          <div class="py-4 px-8 space-y-3">
            <div class="animate-pulse h-3 bg-gray-300 rounded-full w-60" />
            <div class="animate-pulse h-3 bg-gray-300 rounded-full w-72" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
