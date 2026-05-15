<template>
  <span
    class="badge-shine inline-flex items-center justify-center px-1 rounded text-[10px] font-medium leading-[17px] border-[0.5px] tracking-wide uppercase"
    :class="{
      'bg-[rgba(211,64,62,0.03)] border-[rgba(211,64,62,0.6)] text-artisan-accent': required && !deprecated,
      'bg-[#f4fcf6] border-[#73b78f] text-[#25613d]': !required && !deprecated,
      'bg-[#fdf6ec] border-[#d9a441] text-[#8a5a00]': deprecated,
    }"
  >
    <template v-if="deprecated">Deprecated</template>
    <template v-else-if="required">Required</template>
    <template v-else>Optional</template>
  </span>
</template>

<script>
export default {
  props: {
    required: Boolean,
    deprecated: Boolean,
  },
}
</script>
