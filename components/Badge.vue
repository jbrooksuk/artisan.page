<template>
    <span
        class="
        inline-flex
        items-center
        px-2.5
        py-0.5
        rounded-md
        text-sm
        font-medium
        "
        :class="{ 'bg-red-100 text-red-800': required, 'bg-green-100 text-green-800': ! required }"
    >
        <template v-if="required">Required</template>
        <template v-else>Optional</template>
    </span>
</template>

<script>
export default {
    props: {
        required: Boolean
    },
}
</script>
