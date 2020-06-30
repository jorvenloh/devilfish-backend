<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Users</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Username/Email</label>
                            <input
                                v-model="filters.username_or_email"
                                type="text"
                                class="form-control"
                                maxlength="30"
                            />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label>Role</label>
                            <v-select
                                class="text-capitalize"
                                v-model="filters.role"
                                append-to-body
                                :reduce="role => role.label"
                                :options="role_options"
                            ></v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-primary float-right" @click="searchUser()">
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
                <h3 class="card-title">Users</h3>
                <div class="card-tools" v-if="users.length">
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
                                Title (A-Z)
                            </button>
                            <button
                                class="dropdown-item"
                                type="button"
                                @click="sortByName('desc')"
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
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody class="text-capitalize">
                        <tr :key="index" v-for="(item, index) in users">
                            <td>{{index + meta.from }}</td>
                            <td>
                                <a :href="`/admin/users/${item.id}`">{{ item.username || 'N/A'}}</a>
                            </td>
                            <td>
                                <a :href="`/admin/users/${item.id}`">{{ item.email || 'N/A'}}</a>
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
        role: {
            type: String
        }
    },
    data() {
        return {
            filters: {
                role: this.role
            },
            users: [],
            links: {},
            meta: {},
            page: 1,
            sorter: {
                target: "username",
                order: "asc"
            },
            loading: false,
            role_options: [],
            current_filters: {}
        };
    },
    mounted() {
        this.getUsers();
        this.getRoleOptions();
    },
    computed: {
        filteredItems() {
            let filtered_items = [];
            if (this.notEmptyObject(this.current_filters)) {
                const { username_or_email, role } = this.current_filters;
                if (username_or_email) filtered_items.push(username_or_email);
                if (role) filtered_items.push(`Role #${role}`);
            }
            return filtered_items;
        },
    },
    methods: {
        getUsers() {
            this.loading = true;
            axios
                .get("admin/users", {
                    params: {
                        page: this.page,
                        filters: this.filters,
                        sorter: this.sorter
                    }
                })
                .then(response => {
                    this.users = response.data.data;
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
        searchUser() {
            this.page = 1;
            this.getUsers();
        },
        getRoleOptions() {
            this.makeApiRequest(`admin/roles/options`).then(response => {
                this.role_options = response.data;
            });
        },
        showCrew(crew_id) {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/users/${crew_id}`;
        },
        createCrew() {
            window.location.href =
                process.env.MIX_APP_URL + `/admin/users/create`;
        },
        goToPage(pageNumber) {
            if (pageNumber) {
                this.page = pageNumber;
                this.getUsers();
            }
        },
        resetFilters() {
            this.filters = {};
            this.getUsers();
        },
        sortByName(sortOrder) {
            this.page = 1;
            this.sorter = { target: "username", order: sortOrder };
            this.getUsers();
        }
    }
};
</script>

<style scoped>
</style>
