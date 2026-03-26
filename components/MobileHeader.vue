<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  commandName: {
    type: String,
    default: null,
  },
  version: {
    type: String,
    default: null,
  },
  commands: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['search'])

const showSearch = ref(false)
</script>

<template>
  <header class="md:hidden sticky top-0 z-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 py-2.5 min-h-[50px]">
    <!-- Left: Logo + command/version label -->
    <div class="flex items-center gap-4">
      <!-- Full logo on listing pages -->
      <template v-if="!commandName">
        <NuxtLink href="/" class="flex items-center">
          <Logo class="h-7 w-auto dark:text-gray-200" />
          <span class="sr-only">Artisan.page</span>
        </NuxtLink>
      </template>

      <!-- Icon + command dropdown on single command pages -->
      <template v-else>
        <NuxtLink href="/">
          <LogoIcon id="mobile-logo" class="h-[30px] w-auto" />
          <span class="sr-only">Artisan.page</span>
        </NuxtLink>

        <Menu as="div" class="relative">
          <MenuButton class="inline-flex items-center gap-1 text-[13px] font-medium text-gray-950 dark:text-gray-300">
            {{ commandName }}
            <ChevronDownIcon class="size-3.5 text-gray-500" aria-hidden="true" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute left-0 z-10 mt-2 w-56 max-h-64 overflow-y-auto origin-top-left rounded-lg bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
              <div class="py-1">
                <MenuItem v-for="cmd in commands" :key="cmd.name" v-slot="{ active }" as="div">
                  <NuxtLink
                    :to="`/${version}/${cmd.name.replace(':', '')}`"
                    :class="[
                      active ? 'bg-gray-100 dark:bg-gray-800' : '',
                      cmd.name === commandName ? 'text-artisan-accent' : 'text-gray-700 dark:text-gray-400',
                      'block px-3 py-1.5 text-xs font-mono'
                    ]"
                  >
                    {{ cmd.name }}
                  </NuxtLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </template>
    </div>

    <!-- Right: Search + Version picker -->
    <div class="flex items-center gap-3">
      <button
        @click="emit('search')"
        class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        title="Search commands"
      >
        <MagnifyingGlassIcon class="size-4" />
      </button>
      <VersionPicker />
    </div>
  </header>
</template>
