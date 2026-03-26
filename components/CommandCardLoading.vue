<template>
  <div>
    <div v-for="index in 3" :key="index" class="border-b border-gray-200 dark:border-gray-800">
      <div class="px-4 md:px-8 py-10 max-w-3xl mx-auto w-full">
        <!-- Command name + description -->
        <div class="mb-5 space-y-2">
          <div class="animate-pulse h-5 bg-gray-200 dark:bg-gray-800 rounded w-28" />
          <div class="animate-pulse h-4 bg-gray-200 dark:bg-gray-800 rounded w-64" />
        </div>

        <!-- Terminal block -->
        <div class="bg-gray-950 rounded-lg p-1 mb-5">
          <div class="px-3 py-1.5">
            <div class="animate-pulse h-3 bg-gray-800 rounded w-16" />
          </div>
          <div class="bg-[rgba(255,255,255,0.05)] rounded px-3 py-5">
            <div class="animate-pulse h-4 bg-gray-800 rounded w-72" />
          </div>
        </div>

        <!-- Options -->
        <div class="mb-5">
          <div class="animate-pulse h-4 bg-gray-200 dark:bg-gray-800 rounded w-16 mb-3" />
          <div class="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1.5">
            <div class="flex items-center gap-2">
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-24" />
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-14" />
            </div>
            <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-56" />
          </div>
          <div class="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1.5">
            <div class="flex items-center gap-2">
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-20" />
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-14" />
            </div>
            <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-48" />
          </div>
          <div class="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1.5">
            <div class="flex items-center gap-2">
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-14" />
            </div>
            <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-44" />
          </div>
        </div>

        <!-- Arguments -->
        <div>
          <div class="animate-pulse h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 mb-3" />
          <div class="border-t border-gray-200 dark:border-gray-800 py-3 space-y-1.5">
            <div class="flex items-center gap-2">
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-28" />
              <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-14" />
            </div>
            <div class="animate-pulse h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-36" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
