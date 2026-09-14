<template><span><template v-for="(seg, i) in segments" :key="i"><code v-if="seg.code" class="px-1 rounded text-[12px] font-mono font-medium leading-[17px] border-[0.5px] bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">{{ seg.text }}</code><span v-else-if="seg.style" :class="seg.classes">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template></span></template>

<script setup>
import { computed } from 'vue'
import { parseConsole, styleClasses } from '~/utils/console-format'

const props = defineProps({
  text: { type: String, default: '' },
})

const segments = computed(() =>
  (props.text || '').split(/(`+[^`]+`+)/g).flatMap(part => {
    const code = part.match(/^(`+)([^`]+)\1$/)
    return code
      ? [{ text: code[2], code: true }]
      : parseConsole(part).map(seg => ({ ...seg, classes: styleClasses(seg.style) }))
  })
)
</script>
