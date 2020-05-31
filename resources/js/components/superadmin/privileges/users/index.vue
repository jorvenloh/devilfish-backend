<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-user-tie"></i>
                    Holding Users
                </h3>
                <div class="card-tools">
                    <button
                        type="button"
                        class="btn btn-tool"
                        data-toggle="modal"
                        data-target="#modal-assign-user"
                    >
                        <i class="fas fa-fw fa-plus"></i> Add
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
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
                                <td>{{ props.item.username }}</td>
                                <td class="text-capitalize">{{ props.item.email }}</td>
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
                        </VDataTable>
                    </div>
                </div>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
        <AssignUser ref="assignUser" :privilege_id="privilege_id" v-on:updated-assignation="getRelatedUsers()"></AssignUser>
    </div>
</template>

<script>
import VDataTable from "@/components/vDatatable";
import AssignUser from "@/components/superadmin/privileges/users/assignUser";

export default {
    components: { VDataTable, AssignUser },
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
            users: {
                data: [],
                pagination: {}
            },
            columns: [
                {
                    name: "Username",
                    field: "username"
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
        this.getRelatedUsers();
    },
    methods: {
        getRelatedUsers() {
            this.loading = true;
            axios
                .get(`superadmin/privileges/${this.privilege_id}/users`)
                .then(response => {
                    this.users.data = response.data.data;
                    this.users.pagination.links = response.data.links;
                    this.users.pagination.meta = response.data.meta;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        revokePrivilege(user_id) {
            this.confirm(() => {
                axios
                    .delete(
                        `superadmin/privileges/${this.privilege_id}/users/${user_id}`
                    )
                    .then(response => {
                        console.log('ok');
                        this.getRelatedUsers();
                        this.$refs.assignUser.getUnattachedUsers();
                        this.alertSuccess();
                        console.log('done');
                    })
                    .catch(error => {
                        console.log('errorsad');
                        this.alertError({}, error.response.data.errors);
                    });
            });
        }
    }
};
</script>

<style>
</style>
