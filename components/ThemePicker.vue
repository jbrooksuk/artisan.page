<template>
  <!-- placeholder-gray-400 block w-full pl-10 pr-3 py-3 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300 -->
  <select
    v-model="$colorMode.preference"
    class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
  >
    <option value="system">🖥 System</option>
    <option value="light">☀️ Light</option>
    <option value="dark">🌙 Dark</option>
  </select>
</template>
