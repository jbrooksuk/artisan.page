<template>
    <div class="flex flex-col min-h-screen">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
            <main>
                <div class="pb-5 border-b border-gray-200 flex justify-between">
                    <div>
                        <h3 class="text-xl leading-6 font-bold text-gray-900">
                            Laravel Artisan Cheatsheet
                        </h3>
                    </div>

                    <div>
                        <span class="font-semibold">Made by <a href="https://twitter.com/jbrooksuk" target="_blank" class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">@jbrooksuk</a></span>
                    </div>
                </div>

                <div class="mt-2">
                    <form class="w-full flex md:ml-0" action="#" method="GET">
                        <label for="search_field" class="sr-only">Search</label>

                        <div class="relative text-gray-400 focus-within:text-gray-600 min-w-full">
                          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414   1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                          </div>

                          <input id="text" v-model="filter" class="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none" placeholder="Search" tabindex="0" spellcheck="false" autocomplete="off">
                        </div>
                    </form>
                </div>

                <div class="space-y-8 my-8">
                    <div v-if="commands.length == 0">
                        <div class="rounded-xl shadow-lg overflow-hidden bg-white p-10">
                            <h1 class="text-xl font-semilbold text-indigo-900">No Commands Found</h1>
                        </div>
                    </div>

                    <command v-for="command in commands" :key="command.name" :command="command" />
                </div>
            </main>
        </div>

        <app-footer />
    </div>
</template>

<script>
import data from '../static/8.x.json'

export default {
    data () {
        return {
            data: [],
            filter: '',
        }
    },
    created() {
        this.data = data;
    },
    computed: {
        commands () {
            if (! this.filter.length) {
                return this.data;
            }

            const keyword = this.filter.toLowerCase();

            return this.data.filter((command) => {
                if (command.name.includes(this.filter) ||
                    command.description.includes(this.filter)) {
                    return command;
                }
            });
        }
    }
}
</script>
