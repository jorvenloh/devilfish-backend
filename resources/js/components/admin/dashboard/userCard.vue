<template>
    <div class="card">
        <div class="card-header">Users</div>
        <div class="card-body">
            <dl class="row text-capitalize mb-0" :key="index" v-for="(role, index) in roles">
                <dt class="col-sm-4 text-nowrap">{{ role.name }}</dt>
                <dd class="col-sm-8">
                    <span class="float-sm-right">{{ role.users_count }}</span>
                </dd>
            </dl>
            <button type="button" class="btn mt-2 btn-primary" @click="indexUsers()">
                <i class="fas fa-plus" aria-hidden="true"></i>
                See More
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roles: {}
        };
    },
    mounted() {
        this.getRolesInfo();
    },
    methods: {
        getRolesInfo() {
            this.makeApiRequest("admin/dashboard/users").then(response => {
                this.roles = response.data.roles;
            });
        },
        indexUsers(){
            this.navigate('/admin/users');
        }
    }
};
</script>

<style>
</style>
