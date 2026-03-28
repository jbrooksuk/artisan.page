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
    ).sort((a, b) => a[0].localeCompare(b[0]))
  )
})

definePageMeta({
  validate: async(route) => {
    return /^[\d\.x]+$/.test(route.params.version) && /^[\w\-]+$/.test(route.params.command)
  }
})

const ogImageUrl = `https://artisan.page/api/og?command=${encodeURIComponent(command.name)}&description=${encodeURIComponent(command.description)}&version=${encodeURIComponent(commandVersion)}`

useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://artisan.page',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Laravel ${commandVersion}`,
            item: `https://artisan.page/${commandVersion}/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: command.name,
            item: `https://artisan.page/${commandVersion}/${commandName}`,
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: `php artisan ${command.name}`,
        description: command.description,
        url: `https://artisan.page/${commandVersion}/${commandName}`,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        about: {
          '@type': 'SoftwareApplication',
          name: 'Laravel',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Cross-platform',
        },
        isPartOf: {
          '@type': 'WebSite',
          name: 'Artisan.page',
          url: 'https://artisan.page',
        },
      }),
    },
  ],
})

useSeoMeta({
  title: `php artisan ${command.name} - Laravel ${commandVersion} - The Laravel Artisan Cheatsheet`,
  titleTemplate: null,

  description: `php artisan ${command.name} - ${command.description} - Laravel ${commandVersion}.`,
  ogTitle: `php artisan ${command.name} - Laravel ${commandVersion}`,
  ogDescription: `${command.description} — Laravel ${commandVersion} Artisan command reference.`,
  ogImage: ogImageUrl,
  ogUrl: `https://artisan.page/${commandVersion}/${commandName}`,
  twitterTitle: `php artisan ${command.name} - Laravel ${commandVersion}`,
  twitterDescription: `${command.description} — Laravel ${commandVersion} Artisan command reference.`,
  twitterImage: ogImageUrl,
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
              :href="`/${commandVersion}/${cmd.name.replace(':', '')}`"
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
      <!-- Page Header -->
      <div class="hidden md:block border-b border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/30 dark:to-transparent">
        <div class="flex items-center justify-between px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">
          <div class="flex items-center gap-3">
            <NuxtLink href="/">
              <LogoIcon id="cmd-header-logo" class="h-8 w-auto" />
            </NuxtLink>
            <div>
              <NuxtLink href="/" class="font-sans font-semibold text-gray-950 dark:text-gray-200 text-base leading-tight block">
                Artisan.page
              </NuxtLink>
              <span class="text-[11px] text-gray-500 dark:text-gray-500 leading-tight">The Laravel Artisan cheatsheet</span>
            </div>
          </div>
          <div class="flex items-center gap-5">
            <a
              href="https://github.com/sponsors/jbrooksuk"
              @click="sponsorClick"
              target="_blank"
              class="text-artisan-accent text-xs hover:underline decoration-artisan-accent/40"
            >
              Sponsor ↗
            </a>
            <a
              href="https://github.com/jbrooksuk/artisan.page"
              target="_blank"
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="GitHub"
            >
              <svg class="size-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
          </div>
        </div>
      </div>

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
