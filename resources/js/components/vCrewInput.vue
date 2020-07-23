<template>
    <v-select
        v-model="selected_crew"
        append-to-body
        :options="crew_options"
        :reduce="crew => crew.value"
        @search="onCrewSearch"
    >
        <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
                No results found for
                <em>{{ search }}</em>.
            </template>
            <em style="opacity: 0.5;" v-else>Start typing to search for existing crew.</em>
        </template>
    </v-select>
</template>

<script>
export default {
    data() {
        return {
            crew_options: [],
            selected_crew: null,
            crew_searching_threshold: 2,
        };
    },
    methods: {
        onCrewSearch(search, loading) {
            if (search.length >= this.crew_searching_threshold) {
                loading(true);
                axios
                    .get(`api/admin/crews/options`, {
                        params: { name: search }
                    })
                    .then(response => {
                        this.crew_options = response.data;
                    })
                    .catch(error => {
                        this.alertError();
                    })
                    .finally(() => {
                        loading(false);
                    });
            }
        },
        clearInputValue(){
            this.selected_crew = null
        }
    }
};
</script>

<style>
</style>
