<template>
  <select
    v-model="$colorMode.preference"
    class="ml-3 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
  >
    <option value="system">🖥 System</option>
    <option value="light">☀️ Light</option>
    <option value="dark">🌙 Dark</option>
  </select>
</template>
