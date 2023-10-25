<script setup>
const commandName = useRoute().params.command
const commandVersion = useRoute().params.version
const commandData = await import(`../../assets/${commandVersion}.json`)
const command = commandData.default.filter((command) => command.name.replace(':', '') === commandName)[0]

const pages = computed(() => [
  { name: command.name || "Wait...", href: `/${commandVersion}/${commandName}`, current: true },
])
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <Breadcrumbs :pages="pages" />

    <Sponsors />

    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full xl:w-3/4 flex flex-col gap-8">
      <Command :command="command" :version="commandVersion" />

      <Carbon />
    </div>

    <AppFooter />
  </div>
</template>
