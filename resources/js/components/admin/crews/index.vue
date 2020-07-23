<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Actors & Directors</h3>
                <div class="card-tools" v-if="crews.length">
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
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Product</label>
                            <v-select
                                v-model="filters.products"
                                append-to-body
                                :options="product_options"
                                :reduce="product => product.value"
                                @search="onProductsSearch"
                            ></v-select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Has Avatar</label>
                            <v-select
                                v-model="filters.has_avatar"
                                append-to-body
                                :reduce="isTrue => isTrue.value"
                                :options="has_avatar_options"
                            ></v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button
                    type="button"
                    class="btn btn-outline-success float-left"
                    @click="createCrew()"
                >
                    <i class="fas fa-plus" aria-hidden="true"></i>
                    Create New
                </button>
                <button type="button" class="btn btn-primary float-right" @click="searchCrews()">
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

        <div class="d-flex flex-wrap">
            <div class="card card-crew" v-for="crew in crews" :key="crew.name">
                <img v-if="crew.avatar" :src="crew.avatar" class="card-img-top" alt="Avatar" />
                <div class="no-avatar" v-else></div>
                <div class="card-body">
                    <a
                        :href="`/admin/crews/${crew.id}`"
                        class="crew-name stretched-link text-capitalize"
                    >{{ crew.name }}</a>
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
            crews: {},
            links: {},
            meta: {},
            page: 1,
            sorter: {
                target: "name",
                order: "asc"
            },
            loading: false,
            product_options: [],
            product_searching_threshold: 2,
            has_avatar_options: [
                { value: null, label: "All" },
                { value: true, label: "Yes" },
                { value: false, label: "No" }
            ],
            current_filters: {}
        };
    },
    mounted() {
        this.getCrews();
    },
    computed: {
        filteredItems() {
            let filtered_items = [];
            if (this.notEmptyObject(this.current_filters)) {
                const { name, has_avatar, products } = this.current_filters;
                if (name) filtered_items.push(name);
                if (has_avatar != null)
                    filtered_items.push(
                        has_avatar ? "With Avatar" : "Without Avatar"
                    );
                if (products) filtered_items.push(`Product #${products}`);
            }
            return filtered_items;
        }
    },
    methods: {
        getCrews() {
            this.loading = true;
            axios
                .get("api/admin/crews", {
                    params: {
                        page: this.page,
                        filters: this.filters,
                        sorter: this.sorter
                    }
                })
                .then(response => {
                    this.crews = response.data.data;
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
        showCrew(crew_id) {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/crews/${crew_id}`;
        },
        createCrew() {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/crews/create`;
        },
        goToPage(pageNumber) {
            if (pageNumber) {
                this.page = pageNumber;
                this.getCrews();
            }
        },
        onProductsSearch(search, loading) {
            if (search.length >= this.product_searching_threshold) {
                loading(true);
                axios
                    .get(`api/admin/products/options`, {
                        params: { title: search }
                    })
                    .then(response => {
                        this.product_options = response.data;
                    })
                    .catch(error => {
                        this.alertError();
                    })
                    .finally(() => {
                        loading(false);
                    });
            }
        },
        searchCrews() {
            this.page = 1;
            this.getCrews();
        },
        resetFilters() {
            this.filters = {};
            this.getCrews();
        },
        sortByName(sortOrder) {
            this.page = 1;
            this.sorter = { target: "name", order: sortOrder };
            this.getCrews();
        }
    }
};
</script>

<style scoped>
.card-crew {
    max-width: 144px;
    margin-right: 1rem;
}
.no-avatar {
    height: 180px !important;
    width: 144px !important;
}
.no-avatar::after {
    content: "No avatar";
    background-color: grey;
    color: white;
    height: 100%;
    display: block;
    text-align: center;
}
.crew-name {
    white-space: nowrap;
    text-overflow: hidden;
}
.card-body {
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
