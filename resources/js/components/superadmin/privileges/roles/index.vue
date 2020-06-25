<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-user-tie"></i>
                    Holding Roles
                </h3>
                <div class="card-tools">
                    <button
                        type="button"
                        class="btn btn-tool"
                        data-toggle="modal"
                        data-target="#modal-assign-role"
                    >
                        <i class="fas fa-fw fa-plus"></i> Add
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
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
                                <td class="text-capitalize">{{ props.item.name }}</td>
                                <td width="10%" class="text-center">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Revoke privilege"
                                        @click="revokePrivilege(props.item.id)"
                                    >
                                        <i class="fas fa-ban" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </template>
                        </v-datatable>
                    </div>
                </div>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
        <AssignRole ref="assignRole" :privilege_id="privilege_id" v-on:updated-assignation="getRelatedRoles()"></AssignRole>
    </div>
</template>

<script>
import AssignRole from "@/components/superadmin/privileges/roles/assignRole";

export default {
    components:{
        AssignRole
    },
    props: {
        privilege_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            filters: {
                name: null
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
        this.getRelatedRoles();
    },
    methods: {
        getRelatedRoles() {
            this.loading = true;
            axios
                .get(`superadmin/privileges/${this.privilege_id}/roles`)
                .then(response => {
                    this.roles.data = response.data.data;
                    this.roles.pagination.links = response.data.links;
                    this.roles.pagination.meta = response.data.meta;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        revokePrivilege(role_id) {
            this.confirm(() => {
                axios
                    .delete(
                        `superadmin/privileges/${this.privilege_id}/roles/${role_id}`
                    )
                    .then(response => {
                        this.getRelatedRoles();
                        this.$refs.assignRole.getUnattachedRoles();
                        this.alertSuccess();
                    })
                    .catch(error => {
                        //console.log(error.response);
                        this.alertError({}, error.response.data.errors);
                    });
            });
        }
    }
};
</script>

<style>
</style>
