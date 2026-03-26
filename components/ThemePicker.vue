<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const colorIcon = computed(() => {
  switch (useColorMode().preference) {
    case 'system':
      return 'system'
    case 'light':
      return 'light'
    case 'dark':
      return 'dark'
  }
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center justify-center size-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Toggle theme">
        <!-- Sun icon -->
        <svg v-if="colorIcon === 'light'" class="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
        <!-- Moon icon -->
        <svg v-else-if="colorIcon === 'dark'" class="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
        <!-- System/cog icon -->
        <svg v-else class="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 bottom-full z-10 mb-1 w-36 origin-bottom-right rounded-lg bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
        <div class="py-1">
          <MenuItem @click="$colorMode.preference = 'system'" v-slot="{ active }" as="div">
            <div :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'text-gray-700 dark:text-gray-400 block px-3 py-1.5 text-xs cursor-pointer']">System</div>
          </MenuItem>
          <MenuItem @click="$colorMode.preference = 'light'" v-slot="{ active }" as="div">
            <div :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'text-gray-700 dark:text-gray-400 block px-3 py-1.5 text-xs cursor-pointer']">Light</div>
          </MenuItem>
          <MenuItem @click="$colorMode.preference = 'dark'" v-slot="{ active }" as="div">
            <div :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'text-gray-700 dark:text-gray-400 block px-3 py-1.5 text-xs cursor-pointer']">Dark</div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
