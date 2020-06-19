<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Tags</h3>
                <div class="card-tools" v-if="tags.length">
                    <div class="btn-group">
                        <button
                            type="button"
                            class="btn btn-tool"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-bars fa-fw" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <button class="dropdown-item" type="button" @click="sortByName('asc')">
                                <i class="fas fa-sort-alpha-down" aria-hidden="true"></i>
                                Alphabetical order A-Z
                            </button>
                            <button class="dropdown-item" type="button" @click="sortByName('desc')">
                                <i class="fas fa-sort-alpha-down-alt" aria-hidden="true"></i>
                                Alphabetical order Z-A
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Name</label>
                            <input
                                v-model="filters.name"
                                type="text"
                                class="form-control"
                                placeholder="Name"
                                maxlength="30"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-primary float-right" @click="searchTags()">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    Search
                </button>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <div>
                    <button class="btn btn-default btn-badge text-capitalize mr-2">Found {{meta.total}}</button>
                    <div v-if="filteredItems.length" class="d-inline">
                        <button
                            class="btn btn-warning btn-badge text-capitalize"
                            :key="index"
                            v-for="(item, index) in filteredItems"
                        >{{item}}</button>

                        <button
                            type="button"
                            class="btn btn-danger ml-2"
                            @click="resetFilters()"
                        >
                            <i class="fas fa-redo" aria-hidden="true"></i>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-wrap">
            <div class="card card-crew mr-3" v-for="tag in tags" :key="tag.name">
                <div class="card-body">
                    <a
                        :href="`/admin/tags/${tag.id}`"
                        class="crew-name stretched-link text-capitalize"
                    >
                        <i class="fas fa-hashtag"></i>
                        {{ tag.name }}
                    </a>
                </div>
            </div>
        </div>

        <div class="row mb-5">
            <div class="col">
                <v-paginator
                    :links="links"
                    :meta="meta"
                    :filters="filters"
                    v-on:go-to-page="goToPage"
                    :loading="loading"
                    :position="'center'"
                ></v-paginator>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filters: {},
            sorter: {
                target: "name",
                order: "asc"
            },
            tags: [],
            links: {},
            meta: {},
            current_filters: {},
            loading: false,
            page: 1
        };
    },
    mounted() {
        this.getTags();
    },
    computed: {
        filteredItems() {
            let filtered_items = [];
            if (this.notEmptyObject(this.current_filters)) {
                const { name } = this.current_filters;
                let filtered_items = [];
                if (name) filtered_items.push(name);
                return filtered_items;
            }
            return filtered_items;
        }
    },
    methods: {
        getTags() {
            this.loading = true;
            axios
                .get(`admin/tags`, {
                    params: {
                        page: this.page,
                        filters: this.filters,
                        sorter: this.sorter
                    }
                })
                .then(response => {
                    this.tags = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;
                    this.current_filters = response.data.current_filters;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchTags() {
            this.page = 1;
            this.getTags();
        },
        sortByName(sortOrder) {
            this.page = 1;
            this.sorter = { target: "name", order: sortOrder };
            this.getTags();
        },
        resetFilters() {
            this.filters = {};
            this.getTags();
        },
        goToPage(pageNumber) {
            if (pageNumber) {
                this.page = pageNumber;
                this.getTags();
            }
        }
    }
};
</script>

<style>
</style>
