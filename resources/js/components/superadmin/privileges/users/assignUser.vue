<template>
    <div class="modal fade" id="modal-assign-user">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div
                    class="overlay d-flex justify-content-center align-items-center"
                    v-if="loading"
                >
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                </div>
                <div class="modal-header">
                    <h4 class="modal-title">Grant Privilege To User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <p>
                                Please select user(s) from the table below that you wished to assign the privilege
                                <span
                                    class="text-primary"
                                >({{privilege_name}})</span>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="search"
                                        placeholder="Name"
                                        v-model="filters.username_or_email"
                                    />
                                </div>
                                <div class="input-group-append">
                                    <button
                                        type="button"
                                        class="btn btn-default"
                                        @click="searchUnattachedUsers()"
                                    >Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <VDataTable
                                :numbering="true"
                                :columns="columns"
                                :items="users.data"
                                :paginate="true"
                                :pagination="users.pagination"
                                pagination-method="get"
                                :pagination-data="filters"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.name || '--'}}</td>
                                    <td>{{ props.item.email || '--' }}</td>
                                    <td width="10%" class="text-center">
                                        <div class="custom-control custom-checkbox">
                                            <input
                                                class="custom-control-input"
                                                type="checkbox"
                                                :id="props.item.id"
                                                :value="props.item.id"
                                                v-model="checkedUsers"
                                            />
                                            <label
                                                :for="props.item.id"
                                                class="custom-control-label"
                                            ></label>
                                        </div>
                                    </td>
                                </template>
                            </VDataTable>
                        </div>
                    </div>
                    <div class="float-right" v-if="checkedUsers.length">
                        <span>Selected {{ checkedUsers.length }}</span>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="postAssignPrivilegeUsers()"
                    >Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDataTable from "@/components/vDatatable";

export default {
    components: { VDataTable },
    props: {
        privilege_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            privilege_name: "",
            checkedUsers: [],
            filters: {
                username_or_email: "",
                without_privilege: this.privilege_id
            },
            users: {
                data: [],
                pagination: {}
            },
            columns: [
                {
                    name: "Name",
                    field: "name"
                },
                {
                    name: "Email",
                    field: "email"
                },
                {
                    name: "Action",
                    align: "center"
                }
            ]
        };
    },
    mounted() {
        this.getUnattachedUsers();
    },
    methods: {
        getUnattachedUsers() {
            this.loading = true;
            axios
                .get(`superadmin/privileges/${this.privilege_id}/users`, {
                    params: this.filters
                })
                .then(response => {
                    this.users.data = response.data.data;
                    this.users.pagination.links = response.data.links;
                    this.users.pagination.meta = response.data.meta;
                    this.privilege_name = response.data.privilege_name;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postAssignPrivilegeUsers() {
            this.loading = true;
            this.confirm(() => {
                axios
                    .post(`superadmin/privileges/${this.privilege_id}/users`, {
                        users: this.checkedUsers
                    })
                    .then(response => {
                        this.$emit("updated-assignation");
                        this.getUnattachedUsers();
                        $('#modal-assign-user').modal('hide')
                        this.alertSuccess();
                    })
                    .catch(error => {
                        this.alertError({}, error.response.data.errors);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.checkedUsers = [];
                    });
            });
        },
        searchUnattachedUsers() {
            this.checkedUsers = [];
            this.getUnattachedUsers();
        }
    }
};
</script>

<style>
</style>
