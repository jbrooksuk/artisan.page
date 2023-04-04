<template>
  <div
    class="md:flex md:items-center md:justify-between md:space-x-5 bg-gray-50 dark:bg-gray-900 py-4 px-12 border-b border-white dark:border-gray-700 dark:text-gray-400"
  >
    <div class="flex flex-col items-center justify-center w-full">
      <div class="relative">
        <Logo class="h-16" />
        <span class="sr-only">Laravel Artisan Cheatsheet</span>
      </div>
      <div>
        <h2 class="tracking-tight font-semibold hidden md:block">
          A bookmarkable, searchable cheatsheet for
          <a
            href="https://laravel.com"
            class="text-artisan hover:text-artisan-light"
            >Laravel's</a
          >
          default PHP Artisan commands.
        </h2>
      </div>
    </div>
  </div>
</template>
