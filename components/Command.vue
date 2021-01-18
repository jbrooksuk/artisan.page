<template>
    <div :id="slug">
        <div class="rounded-t-xl overflow-hidden bg-white p-10">
            <h1 class="text-xl font-semibold text-indigo-900">
                <a :href="`#${slug}`">{{ command.name }}</a>
            </h1>

            <p class="text-gray-700">{{ command.description }}</p>

            <div v-if="command.options.length" class="text-sm mt-2">
                <p class="font-semibold">Options:</p>
                <ul class="list-disc list-inside">
                    <li v-for="option in command.options">
                        <code class="text-mono">{{ option.name }}</code> - {{ option.description }}

                        <span v-if="option.value_required"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                            Required
                        </span>
                        <span v-else
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            Optional
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="command.arguments.length" class="text-sm mt-2">
                <p class="font-semibold">Arguments:</p>
                <ul class="list-disc list-inside">
                    <li v-for="argument in command.arguments">
                        <code class="text-mono">{{ argument.name }}</code> - {{ argument.description }}

                        <span v-if="argument.required"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                            Required
                        </span>
                        <span v-else
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            Optional
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="overflow-hidden rounded-b-xl bg-gradient-to-r from-indigo-900 to-indigo-700">
            <pre class="scrollbar-none overflow-x-auto p-6 text-sm leading-snug text-white bg-black bg-opacity-40">php artisan {{ command.synopsis }}</pre>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['command'],
    computed: {
        slug () {
            return this.command.name.replace(':', '');
        }
    }
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
