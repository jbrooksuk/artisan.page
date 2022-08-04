<template>
  <div class="md:flex md:items-center md:justify-between md:space-x-5 mb-4">
    <div class="flex items-start space-x-5">
      <div class="flex-shrink-0">
        <div class="relative">
          <img class="h-16 w-16 rounded-full" src="/favicon.ico" alt="" />
          <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
        </div>
      </div>
      <div class="pt-1.5">
        <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-100">Laravel Artisan Cheatsheet</h1>
        <h2 class="text-sm font-medium text-gray-500 dark:text-gray-400">A bookmarkable, searchable cheatsheet for Laravel's default PHP Artisan commands.</h2>
      </div>
    </div>
    <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
      <theme-picker />
    </div>
  </div>
</template>
