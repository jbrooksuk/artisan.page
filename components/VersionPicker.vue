<script setup>
import manifest from '../manifest.json'

const currentVersion = ref(useRoute().params.version || manifest['laravel'][0])

const changeVersion = () => {
  const version = currentVersion.value

  if (version && !manifest.laravel.includes(version)) {
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
    <select
      name="current-version"
      id="current-version"
      v-model="currentVersion"
      @change="changeVersion()"
      class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700"
    >
      <option
        v-for="version in manifest.laravel"
        :value="version"
        :key="version"
      >
        Laravel {{ version }}
      </option>
    </select>
  </div>
</template>
