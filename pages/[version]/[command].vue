<script setup>
import { laravel } from '~/manifest.json'
import groupBy from 'lodash.groupby'

const route = useRoute()
const commandName = route.params.command
const commandVersion = route.params.version
const commandData = await import(`../../assets/${commandVersion}.json`)
const allCommands = commandData.default
const command = allCommands.filter(
  command => command.name.replace(':', '') === commandName
)[0]

if (! command) {
  throw createError({
    statusCode: 404,
    statusMessage: `Command Not Found - ${commandName}`
  })
}

const currentVersion = commandVersion || laravel[0]

const commandLinks = computed(() => {
  return Object.fromEntries(
    Object.entries(
      groupBy(allCommands, (cmd) => {
        return cmd.name.includes(':')
          ? cmd.name.split(':')[0]
          : ''
      })
    ).sort((a, b) => a[0] > b[0])
  )
})

definePageMeta({
  validate: async(route) => {
    return /^[\d\.x]+$/.test(route.params.version) && /^[\w\-]+$/.test(route.params.command)
  }
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
})

useSeoMeta({
  title: `php artisan ${command.name} - Laravel ${commandVersion} - The Laravel Artisan Cheatsheet`,
  titleTemplate: null,

  description: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
  ogTitle: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
  ogDescription: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
  twitterTitle: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
  twitterDescription: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
})

const sponsorClick = () => {
  if (typeof window.fathom !== 'undefined') {
    window.fathom.trackGoal('L3DZXKHP', 0)
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen overflow-hidden bg-white dark:bg-gray-950">
    <!-- Mobile Header -->
    <MobileHeader
      :command-name="command.name"
      :version="currentVersion"
      :commands="allCommands"
    />

    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex md:flex-col md:w-[280px] border-r border-gray-200 dark:border-gray-800 h-full shrink-0">
      <!-- Logo + Version -->
      <div class="flex items-center justify-between px-3 pt-3 pb-2">
        <NuxtLink href="/">
          <LogoIcon id="cmd-sidebar-logo" class="h-[30px] w-auto" />
          <span class="sr-only">Artisan.page</span>
        </NuxtLink>
        <VersionPicker />
      </div>

      <!-- Command List -->
      <nav class="flex-1 overflow-y-auto sidebar-scroll px-5 pb-4">
        <div v-for="(group, groupName) in commandLinks" :key="groupName">
          <h3 class="font-sans font-medium text-[13px] text-gray-950 dark:text-gray-400 py-2.5 leading-4">
            {{ groupName || 'artisan' }}
          </h3>
          <div class="pl-3 pb-4">
            <CommandLink
              v-for="cmd in group"
              :key="cmd.name"
              :command="cmd"
              :active="cmd.name === command.name"
            />
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div class="border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 py-4">
        <a
          href="https://github.com/sponsors/jbrooksuk"
          title="Sponsor James Brooks"
          @click="sponsorClick"
          target="_blank"
          class="text-artisan-accent text-xs leading-4 hover:underline decoration-artisan-accent/40"
        >
          Sponsor Artisan.page on GitHub <span>↗</span>
        </a>
        <ThemePicker />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <Command :command="command" :version="commandVersion" :extended="true" />

      <div class="px-4 md:px-8 py-6 max-w-3xl mx-auto w-full">
        <Carbon />
      </div>
    </main>

    <!-- Mobile Footer -->
    <div class="md:hidden border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-3 py-4 bg-white dark:bg-gray-950">
      <a
        href="https://github.com/sponsors/jbrooksuk"
        title="Sponsor James Brooks"
        @click="sponsorClick"
        target="_blank"
        class="text-artisan-accent text-xs leading-4 hover:underline decoration-artisan-accent/40"
      >
        Sponsor Artisan.page on GitHub <span>↗</span>
      </a>
      <ThemePicker />
    </div>
  </div>
</template>
