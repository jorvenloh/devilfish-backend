<template>
    <div>
        <v-datatable
            :numbering="true"
            :columns="columns"
            :items.sync="privileges.data"
            :paginate="true"
            :pagination="privileges.pagination"
            pagination-method="get"
            :pagination-data="filters"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.description }}</td>
                <td class="text-center">
                    <span>{{ props.item.user_holders_count || '0' }}</span>
                </td>
                <td class="text-center">
                    <span>{{ props.item.role_holders_count || '0' }}</span>
                </td>
                <td class="text-center">
                    <i class="far " :class="[ props.item.enabled ? 'fa-check-circle text-success' : 'fa-times-circle text-danger']"></i>
                </td>
                <td width="10%" class="text-center">
                    <button
                        type="button"
                        class="btn btn-sm btn-success"
                        @click="showPrivilege(props.item.id)"
                    >
                        <i class="fas fa-eye" aria-hidden="true"></i>
                    </button>
                </td>
            </template>
        </v-datatable>
    </div>
</template>

<script>

export default {
    data() {
        return {
            filters: {
                enabled: true
            },
            privileges: {
                data: [],
                pagination: {}
            },
            columns: [
                {
                    name: "Name",
                    field: "name",
                    sortable: "name"
                },
                {
                    name: "Description",
                    field: "description"
                },
                {
                    name: "User(s)",
                    align: 'center'
                },
                {
                    name: "Role(s)",
                    align: 'center'
                },
                {
                    name: "Enabled",
                    field: "enabled",
                    sortable: "enabled",
                    align: 'center'
                },
                {
                    name: "Action",
                    align: 'center'
                }
            ]
        };
    },
    mounted() {
        this.getPrivileges();
    },
    methods: {
        getPrivileges() {
            axios
                .get("superadmin/privileges", {params: this.filters})
                .then(response => {
                    this.privileges.data = response.data.data;
                    this.privileges.pagination.links = response.data.links;
                    this.privileges.pagination.meta = response.data.meta;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showPrivilege(privilege_id){
            window.location.href = process.env.MIX_APP_URL + `/superadmin/system/privileges/${privilege_id}`;
        }
    }
};
</script>

<style>
</style>
