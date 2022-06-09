<template>
  <div
    class="shadow-lg rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 dark:border-2 dark:border-gray-200 pt-4 text-gray-700 dark:text-gray-300"
  >
    <p class="font-bold text-lg pl-4 pb-2" v-if="command.arguments.length > 0">Arguments</p>
    <div
      v-for="(argument, key) in command.arguments"
      class="relative text-gray-400 focus-within:text-gray-600 px-4"
    >
      <input
        v-model.trim="argument.value"
        class="placeholder-gray-400 block p-2 mb-2 w-full text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
        :placeholder="argument.name"
        :tabindex="key"
        spellcheck="false"
        autocomplete="off"
      />
    </div>

    <hr class="m-2" v-if="command.arguments.length > 0">

    <p class="font-bold text-lg pl-4 pb-2" v-if="command.arguments.length > 0">Options</p>
    <div
      v-for="(option, key) in command.options"
      class="flex items-start flex-col text-gray-400 focus-within:text-gray-600 my-2 px-4"
    >
      <template v-if="option.input_type === 'select'">
        <label class="text-gray-700 dark:text-gray-300">{{ option.name }}</label>
        <select
          v-model="option.value"
          class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
        >
          <option
            v-for="option in option.input_options"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
      </template>

      <template
        v-else-if="option.input_type === 'text'"
      >
        <input
          id="text"
          v-model.trim="option.value"
          class="placeholder-gray-400 block p-2 w-full text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-gray-300"
          :placeholder="option.name"
          :tabindex="key"
          spellcheck="false"
          autocomplete="off"
        />
      </template>

      <div
        class="flex items-center h-5"
        v-else
      >
        <input
          :id="key"
          :tabindex="key"
          v-model.trim="option.value"
          type="checkbox"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 dark:text-indigo-400 border-gray-300 rounded"
        />
        <div class="ml-3 text-sm">
          <label for="candidates" class="text-gray-700 dark:text-gray-300">{{ option.name }}</label>
        </div>
      </div>
    </div>

    <div class="group relative overflow-hidden rounded-b-lg bg-indigo-700 bg-opacity-10 dark:bg-indigo-400 dark:bg-opacity-40">
      <div class="flex items-center">
        <div class="flex-initial">
          <pre
            class="scrollbar-none overflow-hidden overflow-x-auto p-6 px-8 text-sm leading-snug text-indigo-900 whitespace-pre-wrap dark:text-gray-300"
          >
php artisan {{ newCommand.trim() }}</pre
          >
        </div>
        <div class="pr-8 flex-1 text-right">
          <button
            type="button"
            class="group-hover:opacity-100 focus:opacity-100 opacity-0 text-indigo-900 transition duration-200"
            @click="copyCommand($event, `php artisan ${newCommand.trim()}`)"
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
      copied: false,
    }
  },
  beforeMount() {
    this.command.options.map((i, a) => {
      if (this.command.synopsis.match("\\b"+i.name.toUpperCase()+"\\b")) {
        this.command.options[a].input_type = 'text'
      }
    })
  },
  computed: {
    newCommand() {
      let command = `${this.command.name} `

      for (const item of this.command.options.filter(i => i.value)) {
        if (item.input_type === 'select' || item.input_type === 'text') {
          command += `--${item.name}=${item.value} `;
        } else {
          command += `--${item.name} `;
        }
      }

      for (const item of this.command.arguments.filter(i => i.value)) {
        command += `${item.value} `;
      }

      return command;
    }
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
