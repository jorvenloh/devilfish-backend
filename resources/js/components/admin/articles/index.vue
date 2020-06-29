<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Filters</h3>
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
                                v-on:keyup.enter="searchArticles()"
                            />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Author</label>
                            <v-select
                                v-model="filters.author"
                                append-to-body
                                :options="author_options"
                                :reduce="author => author.value"
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
                                class="text-capitalize"
                                v-model="filters.status"
                                append-to-body
                                :options="statusOptions"
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
                    @click="createArticle()"
                >
                    <i class="fas fa-plus" aria-hidden="true"></i>
                    Create New
                </button>
                <button type="button" class="btn btn-primary float-right" @click="searchArticles()">
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

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Articles</h3>
                <div class="card-tools" v-if="articles.length">
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
                                Title (A-Z)
                            </button>
                            <button
                                class="dropdown-item"
                                type="button"
                                @click="sortByTitle('desc')"
                            >
                                <i class="fas fa-sort-alpha-down-alt" aria-hidden="true"></i>
                                Title (Z-A)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Last Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="text-capitalize">
                        <tr :key="index" v-for="(item, index) in articles">
                            <td>{{index + 1}}</td>
                            <td>
                                <a
                                    :href="`/admin/articles/${item.id}`"
                                >{{ item.title || 'Untitled'}}</a>
                            </td>
                            <td>
                                <a
                                    :href="`/admin/articles/${item.id}`"
                                >{{ item.author.username || 'Anonymous'}}</a>
                            </td>
                            <td>{{ item.status || '--' }}</td>
                            <td>{{ item.updated_at || '--' | toStandardDateTime(true) }}</td>
                            <td width="10%" class="text-center">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit Article"
                                    @click="editArticle(item.id)"
                                >
                                    <i class="fas fa-edit" aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Preview Article"
                                    @click="showArticle(item.id)"
                                >
                                    <i class="fas fa-eye" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="col">
                        <v-paginator
                            class="m-3"
                            :links="links"
                            :meta="meta"
                            :filters="filters"
                            v-on:go-to-page="goToPage"
                            :loading="loading"
                            :position="'left'"
                        ></v-paginator>
                    </div>
                </div>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String
        }
    },
    data() {
        return {
            loading: true,
            page: 1,
            filters: {
                status: this.status
            },
            sorter: {
                target: "title",
                order: "asc"
            },
            current_filters: {},
            links: {},
            meta: {},
            searching_threshold: 1,
            author_options: [],
            tag_options: [],
            status_options: [],
            articles: {},
            columns: [
                {
                    name: "Title",
                    field: "title"
                },
                {
                    name: "Last Update",
                    field: "updated_at"
                },
                {
                    name: "Status",
                    field: "status"
                },
                {
                    name: "Action",
                    align: "center"
                }
            ]
        };
    },
    computed: {
        filteredItems() {
            let filtered_items = [];
            if (this.notEmptyObject(this.current_filters)) {
                const { title, author, tag, status } = this.current_filters;
                if (title) filtered_items.push(title);
                if (author) filtered_items.push(`Author #${author}`);
                if (tag) filtered_items.push(`Tag #${tag}`);
                if (status) filtered_items.push(status);
            }
            return filtered_items;
        },
        statusOptions() {
            const options = [];
            _.forEach(this.status_options, function(value, key) {
                options.push({ label: value, value: key });
            });
            return options;
        }
    },
    mounted() {
        this.getArticles();
        this.getStatusOptions();
        this.getAuthorOptions();
    },
    methods: {
        getArticles() {
            this.loading = true;
            axios
                .get(`admin/articles`, {
                    params: {
                        page: this.page,
                        filters: this.filters,
                        sorter: this.sorter
                    }
                })
                .then(response => {
                    this.articles = response.data.data;
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
        getStatusOptions() {
            axios
                .get(`admin/articles/options/status`)
                .then(response => {
                    this.status_options = response.data;
                });
        },
        getAuthorOptions() {
            axios
                .get(`admin/articles/options/author`)
                .then(response => {
                    this.author_options = response.data;
                });
        },

        editArticle(article_id) {
            this.navigate(`/admin/articles/${article_id}`, "_blank");
        },
        showArticle(article_id) {
            this.navigate(`/articles/${article_id}`, "_blank", "client");
        },
        searchArticles() {
            this.page = 1;
            this.getArticles();
        },
        createArticle() {
            this.navigate(`/admin/articles/create`, "_blank");
        },
        onTagSearch(search, loading) {
            if (search.length >= this.searching_threshold) {
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
        sortByTitle(sortOrder) {
            this.page = 1;
            this.sorter = { target: "title", order: sortOrder };
            this.getArticles();
        },
        goToPage(pageNumber) {
            if (pageNumber) {
                this.page = pageNumber;
                this.getArticles();
            }
        },
        resetFilters() {
            this.filters = {};
            this.getArticles();
        }
    }
};
</script>

<style>
</style>
