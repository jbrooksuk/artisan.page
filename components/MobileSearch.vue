<script setup>
import Mousetrap from 'mousetrap'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'update:filter'])

const searchInput = ref(null)

watch(() => props.modelValue, (open) => {
  if (open) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const updateFilter = (e) => {
  emit('update:filter', e.target.value)
}

onMounted(() => {
  Mousetrap.bind('escape', () => {
    if (props.modelValue) {
      close()
      return false
    }
  })
})
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 md:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-950/50" @click="close" />

        <!-- Search panel -->
        <div class="relative bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4">
          <div class="flex items-center gap-3">
            <div class="flex-1 relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                ref="searchInput"
                :value="filter"
                @input="updateFilter"
                placeholder="Search commands..."
                type="text"
                class="block w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-950 dark:text-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none"
              />
            </div>
            <button
              @click="close"
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
