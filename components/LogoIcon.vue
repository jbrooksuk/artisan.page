<script setup>
const props = defineProps({
  id: {
    type: String,
    default: () => 'li-' + Math.random().toString(36).slice(2, 6),
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 86 150"
  >
    <defs>
      <linearGradient :id="`${id}-a`" x1="56" y1="58" x2="86" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#7a1b18" />
        <stop offset="1" stop-color="#bb2926" />
      </linearGradient>
      <linearGradient :id="`${id}-b`" x1="28" y1="83" x2="86" y2="83" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#7a1b18" />
        <stop offset="1" stop-color="#471413" />
      </linearGradient>
      <linearGradient :id="`${id}-c`" x1="-13" y1="119" x2="42" y2="63" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ef3931" />
        <stop offset="1" stop-color="#bb2926" />
      </linearGradient>
      <linearGradient :id="`${id}-d`" x1="50" y1="37" x2="35" y2="12" :xlink:href="`#${id}-c`" />
      <linearGradient :id="`${id}-e`" x1="-14" y1="75" x2="28" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#f2706d" />
        <stop offset="0.03" stop-color="#f26c69" />
        <stop offset="0.25" stop-color="#f15650" />
        <stop offset="0.47" stop-color="#f0463f" />
        <stop offset="0.71" stop-color="#ef3c34" />
        <stop offset="1" stop-color="#ef3931" />
      </linearGradient>
    </defs>
    <path :fill="`url(#${id}-a)`" d="M86,116.79,57,100.18V0L86,16.61Z" />
    <path :fill="`url(#${id}-b)`" d="M57,100.18,28.48,83,57,66.42,86,83Z" />
    <path :fill="`url(#${id}-c)`" d="M28.48,150,0,133.39V33.21L28.48,49.82V150" />
    <path :fill="`url(#${id}-d)`" d="M57,0,86,16.61,28.48,49.82,0,33.21Z" />
    <path :fill="`url(#${id}-e)`" d="M28.48,83,0,100.74V33.21L28.48,49.82Z" />
    <path fill="#ef3931" d="M57,0,86,16.61,57.16,33.09Z" />
  </svg>
</template>
