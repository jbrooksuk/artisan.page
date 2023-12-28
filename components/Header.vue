<template>
  <div
    class="md:flex md:items-center md:justify-between md:space-x-5 bg-gray-100 dark:bg-gray-900 py-4 px-12 dark:text-gray-400"
  >
    <div class="flex flex-col items-center justify-center w-full">
      <div class="relative">
        <NuxtLink href="/">
          <Logo class="h-16" />
          <span class="sr-only">The Laravel Artisan Cheatsheet</span>
        </NuxtLink>
      </div>
      <div>
        <h2 class="tracking-tight font-medium hidden md:block">
          A searchable, bookmarkable cheatsheet for
          <a
            href="https://laravel.com"
            class="text-artisan hover:text-artisan-light"
            >Laravel's</a
          >
          Artisan commands.
        </h2>
      </div>
    </div>
  </div>
</template>
