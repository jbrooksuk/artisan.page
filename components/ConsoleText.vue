<template><span><template v-for="(seg, i) in segments" :key="i"><span v-if="seg.style" :class="seg.classes">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template></span></template>

<script setup>
import { computed } from 'vue'
import { parseConsole, styleClasses } from '~/utils/console-format'

const props = defineProps({
  text: { type: String, default: '' },
})

const segments = computed(() =>
  parseConsole(props.text).map(seg => ({ ...seg, classes: styleClasses(seg.style) }))
)
</script>
