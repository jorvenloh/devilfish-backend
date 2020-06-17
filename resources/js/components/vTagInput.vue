<template>
    <div>
        <button class="btn btn-outline-primary mb-2" @click="toggleShow()">
            <i class="fas fa-hashtag fa-fw" aria-hidden="true"></i>
            Add Tags
        </button>
        <div v-if="show_input">
            <v-select v-model="tags" taggable multiple :options="options" @search="onTagsSearch">
                <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                        No results found for
                        <em>{{ search }}</em>.
                    </template>
                    <em style="opacity: 0.5;" v-else>Start typing to search for similar tags.</em>
                </template>
            </v-select>
            <span v-if="errors" class="help-block text-danger d-block">{{ errors }}</span>

            <div class="mt-2 d-block">
                <button class="btn btn-success" @click="saveTags()">
                    <i class="fas fa-fw fa-check mr-1" aria-hidden="true"></i>Save
                </button>
                <button class="btn btn-default" @click="toggleShow()">
                    <i class="fas fa-fw fa-times mr-1" aria-hidden="true"></i>Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: [],
            options: [],
            searching_threshold: 2,
            errors: null,
            show_input: false
        };
    },
    methods: {
        onTagsSearch(search, loading) {
            if (search.length >= this.searching_threshold) {
                loading(true);
                axios
                    .get(`tags`, { params: { name: search } })
                    .then(response => {
                        this.options = response.data;
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
                    .finally(() => {
                        loading(false);
                    });
            }
        },
        saveTags() {
            this.errors = null;
            if (this.tags.length) {
                this.$emit("save-tags", this.tags);
                this.tags = [];
            } else {
                this.errors = "Tags field is required.";
            }
        },
        toggleShow() {
            this.show_input = !this.show_input;
        }
    }
};
</script>

<style>
</style>
