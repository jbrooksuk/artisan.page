<template>
  <div @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
       class="
         my-3
         ml-5
         h-12
         w-12
         cursor-pointer
         border-2
         rounded-md
         flex
         justify-center
         items-center
         text-indigo-900
         bg-gray-100
         hover:bg-gray-200
         hover:border-indigo-400
         hover:text-indigo-400
         dark:bg-gray-800
         dark:border-indigo-400
         dark:text-yellow-200
         dark:hover:bg-gray-900
         dark:hover:text-indigo-400
      "
      >

    <!-- sun -->
    <svg v-if="$colorMode.preference === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>

    <!-- moon -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </div>
</template>
