<template>
    <div class="modal fade" id="modal-assign-role">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div
                    class="overlay d-flex justify-content-center align-items-center"
                    v-if="loading"
                >
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                </div>
                <div class="modal-header">
                    <h4 class="modal-title">Grant Privilege To Role</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <p>
                                Please select role(s) from the table below that you wished to assign the privilege
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
                                        v-model="filters.name"
                                    />
                                </div>
                                <div class="input-group-append">
                                    <button
                                        type="button"
                                        class="btn btn-default"
                                        @click="searchUnattachedRoles()"
                                    >Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <v-datatable
                                :numbering="true"
                                :columns="columns"
                                :items="roles.data"
                                :paginate="true"
                                :pagination="roles.pagination"
                                pagination-method="get"
                                :pagination-data="filters"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.code }}</td>
                                    <td>{{ props.item.name }}</td>
                                    <td width="10%" class="text-center">
                                        <div class="custom-control custom-checkbox">
                                            <input
                                                class="custom-control-input"
                                                type="checkbox"
                                                :id="props.item.id"
                                                :value="props.item.id"
                                                v-model="checkedRoles"
                                            />
                                            <label
                                                :for="props.item.id"
                                                class="custom-control-label"
                                            ></label>
                                        </div>
                                    </td>
                                </template>
                            </v-datatable>
                        </div>
                    </div>
                    <div class="float-right" v-if="checkedRoles.length">
                        <span>Selected {{ checkedRoles.length }}</span>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="postAssignPrivilegeRoles()"
                    >Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
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
            checkedRoles: [],
            filters: {
                name: "",
                without_privilege: this.privilege_id
            },
            roles: {
                data: [],
                pagination: {}
            },
            columns: [
                {
                    name: "Code",
                    field: "code"
                },
                {
                    name: "Name",
                    field: "name"
                },
                {
                    name: "Action",
                    align: "center"
                }
            ]
        };
    },
    mounted() {
        this.getUnattachedRoles();
    },
    methods: {
        getUnattachedRoles() {
            this.loading = true;
            axios
                .get(`superadmin/privileges/${this.privilege_id}/roles`, {
                    params: this.filters,
                })
                .then(response => {
                    this.roles.data = response.data.data;
                    this.roles.pagination.links = response.data.links;
                    this.roles.pagination.meta = response.data.meta;
                    this.privilege_name = response.data.privilege_name;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postAssignPrivilegeRoles() {
            this.loading = true;
            this.confirm(() => {
                axios
                    .post(`superadmin/privileges/${this.privilege_id}/roles`, {
                        roles: this.checkedRoles
                    })
                    .then(response => {
                        this.$emit("updated-assignation");
                        this.getUnattachedRoles();
                        $('#modal-assign-role').modal('hide')
                        this.alertSuccess();
                    })
                    .catch(error => {
                        this.alertError({}, error.response.data.errors);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.checkedRoles = [];
                    });
            });
        },
        searchUnattachedRoles() {
            this.checkedRoles = [];
            this.getUnattachedRoles();
        }
    }
};
</script>

<style>
</style>
