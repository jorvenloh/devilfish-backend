<template>
    <div>
        <button class="btn btn-outline-primary mb-3" @click="attachCrew">
            <i class="fas fa-fw fa-user mr-1" aria-hidden="true"></i>Attach Crew
        </button>

        <div class="card" v-if="is_adding_crews">
            <div class="card-body bg-light">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Crew</label>
                            <vCrewInput ref="crewInput"></vCrewInput>
                            <span
                                v-if="errors.crew"
                                class="help-block text-danger d-block"
                            >{{ errors.crew[0] }}</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>As role</label>
                            <v-select
                                class="text-capitalize"
                                v-model="form.role"
                                :options="roleOptions"
                                :reduce="role => role.value"
                            />
                            <span
                                v-if="errors.role"
                                class="help-block text-danger d-block"
                            >{{ errors.role[0] }}</span>
                        </div>
                    </div>
                    <div class="col-12 my-3">
                        <a
                            href="/admin/crews/create"
                            target="_blank"
                        >Can't find the crew? Create one here</a>

                        <button class="btn btn-success float-right" @click="saveAttachedCrew">
                            <i class="fas fa-fw fa-check" aria-hidden="true"></i>
                            Confirm
                        </button>
                        <button
                            class="btn btn-default float-right mr-2"
                            @click="() => {is_adding_crews = !is_adding_crews}"
                        >
                            <i class="fas fa-fw fa-times" aria-hidden="true"></i>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-striped table-crews">
            <thead>
                <tr>
                    <th class="text-center">#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th class="text-center">Action</th>
                </tr>
            </thead>
            <tbody class="text-capitalize">
                <tr :key="index" v-for="(crew, index) in crews">
                    <td>{{index + 1}}</td>
                    <td>
                        <a :href="`/admin/crews/${crew.id}`" target="_blank">{{crew.name}}</a>
                    </td>
                    <td>
                        <a
                            href="#"
                            @click="editStatus(crew.id, crew.role)"
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Click to edit"
                        >{{crew.role}}</a>
                    </td>
                    <td>
                        <button
                            class="btn btn-xs btn-danger"
                            @click="confirmDetachCrew(crew.id)"
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Detach crew"
                        >
                            <i class="fas fa-fw fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
                <tr v-if="!crews.length">
                    <td colspan="4">
                        <span class="text-muted">
                            <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                            No crew member found
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import vCrewInput from "@/components/vCrewInput";

export default {
    components: { vCrewInput },
    props: {
        product_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            crews: [],
            is_adding_crews: false,
            form: {},
            role_options: {},
            errors: []
        };
    },
    computed: {
        roleOptions() {
            const options = [];
            _.forEach(this.role_options, function(value, key) {
                options.push({ label: value, value: key });
            });
            return options;
        }
    },
    mounted() {
        this.getCrews();
        this.getRoleOptions();
    },
    methods: {
        getCrews() {
            this.loading = true;
            axios
                .get(`admin/products/${this.product_id}/crews`)
                .then(response => {
                    this.crews = response.data.data;
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getRoleOptions() {
            axios
                .get(`admin/products/${this.product_id}/crews/roles`)
                .then(response => {
                    this.role_options = response.data;
                });
        },
        patchCrews(crew_id, payload) {
            this.loading = true;
            axios
                .patch(
                    `admin/products/${this.product_id}/crews/${crew_id}`,
                    payload
                )
                .then(response => {
                    this.alertSuccess();
                    this.getCrews();
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async editStatus(crew_id, current_value) {
            if (this.role_options) {
                const { value: role } = await this.$swal.fire({
                    title: "Select role",
                    input: "select",
                    inputOptions: this.role_options,
                    inputValue: current_value,
                    showCancelButton: true,
                    inputValidator: value => {
                        if (!value) {
                            return "You need to choose something!";
                        }
                    }
                });
                if (role) {
                    this.patchCrews(crew_id, { role: role });
                }
            }
        },
        confirmDetachCrew(crew_id) {
            this.loading = true;
            this.confirm(
                () => {
                    axios
                        .delete(
                            `admin/products/${this.product_id}/crews/${crew_id}`
                        )
                        .then(response => {
                            this.alertSuccess();
                            this.crews = response.data.crews;
                        })
                        .catch(error => {
                            this.alertError();
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                },
                { text: "Detach this crew?" }
            );
        },
        attachCrew() {
            this.is_adding_crews = !this.is_adding_crews;
            this.form.role = this.roleOptions[0].value;
        },
        saveAttachedCrew() {
            this.loading = true;
            this.form.crew = this.$refs.crewInput.selected_crew;
            axios
                .post(`admin/products/${this.product_id}/crews`, this.form)
                .then(response => {
                    this.alertSuccess();
                    this.getCrews();
                    this.$refs.crewInput.clearInputValue();
                })
                .catch(error => {
                    this.alertError();
                    this.errors = error.response.data.errors;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.table-crews tr td:first-child,
.table-crews tr td:last-child {
    width: 10%;
    text-align: center;
}
</style>
