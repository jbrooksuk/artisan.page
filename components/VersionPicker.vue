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
  <div>
    <label for="current-version" class="sr-only">Laravel Version</label>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex items-center gap-1 text-[13px] font-medium text-gray-950 dark:text-gray-400 hover:text-artisan-accent dark:hover:text-artisan-accent transition-colors">
          Version {{ currentVersion }}
          <ChevronDownIcon class="size-3.5 text-gray-500" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-lg bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
          <div class="py-1">
            <MenuItem v-for="version in laravel" :key="version" v-slot="{ active }" as="div">
              <NuxtLink :to="`/${version}/`" @click.prevent="changeVersion(version)" :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-gray-300' : 'text-gray-700 dark:text-gray-400', 'block px-3 py-1.5 text-xs font-mono']">{{ version }}</NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
