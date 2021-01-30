<template>
  <div class="space-y-8 my-8">
        <div v-if="commands.length == 0">
            <div class="rounded-xl shadow-lg overflow-hidden bg-white p-10 text-center">
                <h1 class="text-xl font-bold text-indigo-900">No Commands Found</h1>
                <p>Nothing found for <code class="font-mono">{{ filter }}</code></p>
            </div>
        </div>

        <command v-for="command in commands" :key="command.name" :command="command" />
    </div>
</template>

<script>
const Mousetrap = require('mousetrap');
import data from '../assets/8.x.json'

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
    mounted() {
        Mousetrap.bind(['command+k', 'ctrl+k'], (event) => {
            this.$refs.search.focus();

            return false;
        });
    },
    computed: {
        commands () {
            if (! this.filter.length) {
                return this.data;
            }

            const keyword = this.filter.toLowerCase();

            return this.data.filter((command) => {
                if (command.name.toLowerCase().includes(keyword) ||
                    command.synopsis.toLowerCase().includes(keyword) ||
                    command.description.toLowerCase().includes(keyword)) {
                    return command;
                }
            });
        }
    },
    methods:{
        handleFilter(event) {
            this.filter = event.target.value
        }
    }
}
</script>
