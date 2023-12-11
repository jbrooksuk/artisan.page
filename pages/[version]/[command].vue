<script setup>
const route = useRoute()
const commandName = route.params.command
const commandVersion = route.params.version
const commandData = await import(`../../assets/${commandVersion}.json`)
const command = commandData.default.filter(
  command => command.name.replace(':', '') === commandName
)[0]

const pages = computed(() => [
  {
    name: command.name || 'Wait...',
    href: `/${commandVersion}/${commandName}`,
    current: true,
  },
])

useHead({
  title: `php artisan ${command.name} - Laravel ${commandVersion} - The Laravel Artisan Cheatsheet`,
  titleTemplate: null,
  link: [
    {
      rel: 'canonical',
      href: `https://artisan.page${route.path}`,
    },
  ],
})

useSeoMeta({
  description: `php artisan ${command.name} - ${command.description}`,
  ogTitle: `php artisan ${command.name} - Laravel ${commandVersion} - The Laravel Artisan Cheatsheet`,
  ogDescription: `php artisan ${command.name} - ${command.description}`,
  twitterTitle: `php artisan ${command.name} - Laravel ${commandVersion} - The Laravel Artisan Cheatsheet`,
  twitterDescription: `php artisan ${command.name} - ${command.description}`,
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <Breadcrumbs :pages="pages" />

    <Sponsors />

    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 w-full xl:w-3/4 flex flex-col gap-8"
    >
      <Command :command="command" :version="commandVersion" />

      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>
