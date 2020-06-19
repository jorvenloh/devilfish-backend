<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Filters</h3>
                <div class="card-tools" v-if="products.length">
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
                            <button class="dropdown-item" type="button" @click="sortByTitle('asc')">
                                <i class="fas fa-sort-alpha-down" aria-hidden="true"></i>
                                Alphabetical order A-Z
                            </button>
                            <button
                                class="dropdown-item"
                                type="button"
                                @click="sortByTitle('desc')"
                            >
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
                            <label>Title</label>
                            <input
                                v-model="filters.title"
                                type="text"
                                class="form-control"
                                placeholder="Name"
                                maxlength="30"
                                v-on:keyup.enter="searchProducts()"
                            />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Actor/Director</label>
                            <v-select
                                v-model="filters.crew"
                                append-to-body
                                :options="crew_options"
                                :reduce="crew => crew.value"
                                @search="onCrewSearch"
                            ></v-select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Tag</label>
                            <v-select
                                v-model="filters.tag"
                                append-to-body
                                :options="tag_options"
                                :reduce="tag => tag.value"
                                @search="onTagSearch"
                            ></v-select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Status</label>
                            <v-select
                                v-model="filters.status"
                                append-to-body
                                :options="status_options"
                                :reduce="status => status.value"
                            ></v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button
                    type="button"
                    class="btn btn-outline-success float-left"
                    @click="createProduct()"
                >
                    <i class="fas fa-plus" aria-hidden="true"></i>
                    Create New
                </button>
                <button type="button" class="btn btn-primary float-right" @click="searchProducts()">
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
                    <button
                        class="btn btn-default btn-badge text-capitalize mr-2"
                    >Found {{meta.total}}</button>

                    <div v-if="filteredItems.length" class="d-inline">
                        <button
                            class="btn btn-warning btn-badge text-capitalize"
                            :key="index"
                            v-for="(item, index) in filteredItems"
                        >{{item}}</button>

                        <button type="button" class="btn btn-danger ml-2" @click="resetFilters()">
                            <i class="fas fa-redo" aria-hidden="true"></i>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <v-tiles :items="products">
                    <template #displayImage="displayImageProps">
                        <img
                            v-if="displayImageProps.item.poster"
                            :src="displayImageProps.item.poster"
                            class="card-img-top"
                            alt="Poster"
                        />
                    </template>
                    <template #navigation="navProps">
                        <a
                            :href="`/admin/products/${navProps.item.id}`"
                            class="tile-name stretched-link text-capitalize"
                        >{{ navProps.item.title }}</a>
                    </template>
                </v-tiles>
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
    props: {
        status: {
            type: String,
            required: true,
            default: 'saved'
        }
    },
    data() {
        return {
            filters: {},
            products: [],
            links: {},
            meta: {},
            page: 1,
            sorter: {
                target: "title",
                order: "asc"
            },
            loading: false,
            crew_options: [],
            tag_options: [],
            status_options: [
                { value: null, label: "All" },
                { value: 'saved', label: "Saved" },
                { value: 'published', label: "Published" },
                { value: 'unstaged', label: "Unstaged" }
            ],
            crew_searching_threshold: 2,
            tag_searching_threshold: 2,
            current_filters: {}
        };
    },
    mounted() {
        this.getProducts();
        this.filters.status = this.status;
    },
    computed: {
        filteredItems() {
            let filtered_items = [];
            if (this.notEmptyObject(this.current_filters)) {
                const { title, crew, tag, status } = this.current_filters;
                if (title) filtered_items.push(title);
                if (crew) filtered_items.push(`Crew #${crew}`);
                if (tag) filtered_items.push(`Tag #${tag}`);
                if (status) filtered_items.push(status);
            }
            return filtered_items;
        }
    },
    methods: {
        getProducts() {
            this.loading = true;
            axios
                .get("admin/products", {
                    params: {
                        page: this.page,
                        filters: this.filters,
                        sorter: this.sorter
                    }
                })
                .then(response => {
                    this.products = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;
                    this.current_filters = response.data.current_filters;
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        showProduct(product_id) {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/products/${product_id}`;
        },
        createProduct() {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/products/create`;
        },
        goToPage(pageNumber) {
            if (pageNumber) {
                this.page = pageNumber;
                this.getProducts();
            }
        },
        onCrewSearch(search, loading) {
            if (search.length >= this.crew_searching_threshold) {
                loading(true);
                axios
                    .get(`admin/crews/options`, {
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
        onTagSearch(search, loading) {
            if (search.length >= this.tag_searching_threshold) {
                loading(true);
                axios
                    .get(`admin/tags/options`, {
                        params: { name: search }
                    })
                    .then(response => {
                        this.tag_options = response.data;
                    })
                    .catch(error => {
                        this.alertError();
                    })
                    .finally(() => {
                        loading(false);
                    });
            }
        },
        searchProducts() {
            this.page = 1;
            this.getProducts();
        },
        resetFilters() {
            this.filters = {};
            this.getProducts();
        },
        sortByTitle(sortOrder) {
            this.page = 1;
            this.sorter = { target: "title", order: sortOrder };
            this.getProducts();
        }
    }
};
</script>

<style scoped>
</style>
