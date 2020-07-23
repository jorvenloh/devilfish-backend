<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">
                <i class="far fa-file-alt"></i>
                Information
            </h3>
            <div class="card-tools" v-if="notEmptyObject(privilege)">
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-tool"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="fas fa-fw fa-cog"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <button
                            v-if="privilege.enabled != null"
                            class="dropdown-item"
                            type="button"
                            @click="changePrivilegeStatus()"
                        >
                        <i class="fas fa-fw" :class="privilege.enabled ? 'fa-ban' : 'fa-check'"></i>
                        {{ privilege.enabled ? 'Disable' : 'Enable' }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <dl v-if="notEmptyObject(privilege)">
                <dt>Title</dt>
                <dd v-if="privilege.name">{{ privilege.name }}</dd>
                <dt>Description</dt>
                <dd v-if="privilege.description">{{ privilege.description }}</dd>
                <dt>Status</dt>
                <dd v-if="privilege.enabled" class="text-success">
                    <i class="far fa-check-circle mr-2"></i>Active
                </dd>
                <dd v-else class="text-danger">
                    <i class="far fa-times-circle mr-2"></i>Disabled
                </dd>
            </dl>
            <div v-else class="text-center">
                <h5 class="text-secondary">
                    <i class="far fa-2x fa-folder-open d-block"></i>Not found
                </h5>
            </div>
        </div>
        <div class="overlay dark" v-if="loading">
            <i class="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
    </div>
</template>

<script>
import SweetAlert from "@/mixins/sweetalertMixin";

export default {
    props: {
        privilege_id: {
            type: Number,
            required: true
        }
    },
    mixins: [SweetAlert],
    data() {
        return {
            loading: true,
            privilege: {}
        };
    },
    mounted() {
        this.getPrivilege();
    },
    methods: {
        getPrivilege() {
            this.loading = true;
            axios
                .get(`api/superadmin/privileges/${this.privilege_id}`)
                .then(response => {
                    this.privilege = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        changePrivilegeStatus() {
            const warning_message = this.privilege.enabled ? 'Disabling this privilege will affect all holders' : 'Enable this privilege for all holders';
            this.confirm(() => {
                this.confirmWithPassword(password => {
                    axios
                        .patch(`api/superadmin/privileges/${this.privilege_id}`, {
                            enabled: !this.privilege.enabled,
                            password: password
                        })
                        .then(response => {
                            this.privilege = response.data.data;
                            this.alertSuccess();
                        })
                        .catch(error => {
                            this.alertError({}, error.response.data.errors);
                        });
                });
            }, {text: warning_message});
        }
    }
};
</script>

<style>
</style>
