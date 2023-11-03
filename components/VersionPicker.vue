<script setup>
import { laravel } from '../manifest.json'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const currentVersion = ref(useRoute().params.version || laravel[0])

const changeVersion = (version) => {
  if (version && !laravel.includes(version)) {
    useError({
      statusCode: 404,
      message: `Laravel version ${version} not found.`,
    })
  }

  if (typeof window.fathom !== 'undefined') {
    window.fathom.trackGoal('QUL7QUJP', 0)
  }

  useRouter().push({
    path: `/${version}/`,
    hash: window.location.hash,
  })
}
</script>

<template>
  <div class="flex-1 w-full">
    <label for="current-version" class="sr-only">Laravel Version</label>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
          {{ currentVersion }}
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute left-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-gray-700">
          <div class="py-1">
            <MenuItem v-for="version in laravel" :key="version" v-slot="{ active }" as="div">
              <NuxtLink :to="`/${version}/`" @click.prevent="changeVersion(version)" :class="[active ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-400' : 'text-gray-700 dark:text-gray-400', 'block px-4 py-2 text-sm']">{{ version }}</NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
