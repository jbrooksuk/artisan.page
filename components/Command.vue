<template>
  <div :id="slug" class="shadow-lg rounded-lg overflow-hidden">
    <div class="rounded-t-lg overflow-hidden bg-white p-10">
      <h1 class="text-lg font-bold text-indigo-900 font-heading">
        <a :href="`#${slug}`">{{ command.name }}</a>
      </h1>

      <p class="text-gray-700">{{ command.description }}</p>

      <div v-if="command.options.length" class="text-sm mt-2 text-gray-700">
        <p class="font-semibold">Options:</p>
        <ul class="list-disc list-inside space-y-1">
          <li v-for="option in command.options" :key="option.name">
            <code class="text-mono">{{ option.name }}</code> -
            {{ option.description }}

            <span
              v-if="option.value_required"
              class="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-md
                text-sm
                font-medium
                bg-red-100
                text-red-800
              "
            >
              Required
            </span>
            <span
              v-else
              class="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-md
                text-sm
                font-medium
                bg-green-100
                text-green-800
              "
            >
              Optional
            </span>
          </li>
        </ul>
      </div>

      <div v-if="command.arguments.length" class="text-sm mt-2 text-gray-700">
        <p class="font-semibold">Arguments:</p>
        <ul class="list-disc list-inside space-y-1">
          <li v-for="argument in command.arguments" :key="argument.name">
            <code class="text-mono">{{ argument.name }}</code> -
            {{ argument.description }}

            <span
              v-if="argument.required"
              class="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-md
                text-sm
                font-medium
                bg-red-100
                text-red-800
              "
            >
              Required
            </span>
            <span
              v-else
              class="
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-md
                text-sm
                font-medium
                bg-green-100
                text-green-800
              "
            >
              Optional
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="
        group
        relative
        overflow-hidden
        rounded-b-lg
        bg-gradient-to-r
        from-indigo-900
        to-indigo-700
      "
    >
      <div class="flex items-center bg-black bg-opacity-40">
        <div class="flex-initial">
          <pre
            class="
              scrollbar-none
              overflow-hidden overflow-x-auto
              p-6
              pr-8
              text-sm
              leading-snug
              text-white
              whitespace-pre-wrap
            "
          >
php artisan {{ command.synopsis }}</pre
          >
        </div>
        <div class="pr-8 flex-1 text-right">
          <button
            type="button"
            class="
              group-hover:opacity-100
              focus:opacity-100
              opacity-0
              text-white
              transition
              duration-200
            "
            :class="{ 'focus:outline-none': !keyboardUsed }"
            @click="copyCommand($event, `php artisan ${command.name}`)"
          >
            <span class="sr-only">Click to copy</span>
            <svg
              v-if="copied"
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['command'],
  data() {
    return {
      keyboardUsed: false,
      copied: false,
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 9) this.keyboardUsed = true
    })
  },
  computed: {
    slug() {
      return this.command.name.replace(':', '')
    },
  },
  methods: {
    async copyCommand(event, command) {
      const textarea = document.createElement('textarea')
      textarea.setAttribute('aria-hidden', 'true')
      textarea.textContent = command
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      event.target.closest('button').focus()
      this.copied = true
      await new Promise(resolve => setTimeout(resolve, 1500))
      this.copied = false
    },
  },
}
</script>

<style>
.bg-opacity-40 {
  --bg-opacity: 0.4;
}

.py-0\.5 {
  padding: 0.125rem;
}

.px-2\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
</style>
