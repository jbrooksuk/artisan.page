<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const carbonads = ref(null)
const frame = ref(null)
const height = ref(280)
const emit = defineEmits(['ready', 'error'])
let script
let observer
let resizeObserver
let disposed = false

// Based on Nuxt Scripts' ScriptCarbonAds lifecycle. Each frame isolates Carbon's
// fixed IDs and global callback so concurrent placements cannot share an ad slot.
function loadCarbon() {
  if (disposed || script || !frame.value?.contentDocument) return

  observer?.disconnect()
  const doc = frame.value.contentDocument
  const style = doc.createElement('style')
  style.textContent = `
    body { margin: 0; font-family: system-ui, sans-serif; }
    #carbonads { margin: 0 auto; }
    a { color: inherit; text-decoration: none; }
    .carbon-wrap { display: flex; align-items: flex-start; gap: 16px; }
    .carbon-img { flex-shrink: 0; }
    .carbon-img img { border-radius: 2px; }
    .carbon-text { flex: 1; font-size: 14px; color: #6b7280; }
    .carbon-poweredby { display: block; margin-top: 12px; font-size: 12px; text-align: right; color: #9ca3af; }
  `
  doc.head.appendChild(style)

  resizeObserver = new ResizeObserver(() => {
    height.value = Math.max(280, Math.ceil(doc.body.getBoundingClientRect().height))
  })
  resizeObserver.observe(doc.body)

  script = doc.createElement('script')
  script.async = true
  script.src = 'https://cdn.carbonads.com/carbon.js?serve=CEAIP27N&placement=artisanpage&format=cover'
  script.id = '_carbonads_js'
  script.onload = () => emit('ready', script)
  script.onerror = (error) => emit('error', error)
  doc.body.appendChild(script)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) loadCarbon()
  }, { rootMargin: '200px' })
  observer.observe(carbonads.value)
})

onBeforeUnmount(() => {
  disposed = true
  observer?.disconnect()
  resizeObserver?.disconnect()
  if (script) {
    script.onload = null
    script.onerror = null
    script.remove()
    script = undefined
  }
})
</script>

<template>
  <div ref="carbonads" class="Carbon p-3 max-w-full">
    <iframe
      ref="frame"
      title="Advertisement via Carbon"
      class="block w-full border-0"
      :style="{ height: `${height}px` }"
    />
  </div>
</template>
