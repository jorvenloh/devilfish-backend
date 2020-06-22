<template>
    <div class="row">
        <div class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Profile</h3>
                    <div class="card-tools">
                        <button
                            class="btn btn-tool"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-fw fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div
                            class="dropdown-menu dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <a class="dropdown-item text-danger" href="#" @click="confirmDeleteCrew">
                                <i class="fas fa-fw fa-trash-alt" aria-hidden="true"></i>
                                Delete Profile
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body box-profile">
                    <div class="text-center">
                        <img
                            v-if="avatar"
                            :src="avatar"
                            class="img-fluid image-avatar"
                            alt="Avatar"
                        />
                    </div>
                    <h3 class="profile-username text-center">
                        {{name}}
                        <button
                            type="button"
                            class="btn btn-tool position-absolute m-0"
                            @click="editName"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Edit Name"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                    </h3>
                </div>
            </div>

            <v-tags-card
                ref="tagsCard"
                :tags="tags"
                :loading="loading_tags"
                v-on:add-tags="addTags"
                v-on:sync-tags="syncTags"
            ></v-tags-card>
        </div>
        <div class="col-sm-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Description</h3>
                    <div class="card-tools">
                        <button
                            type="button"
                            class="btn btn-tool"
                            @click="editDescription"
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Edit Description"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body card-body__description">
                    <div v-if="!is_editing_description">
                        <pre class="p-0" v-if="description">{{ description }}</pre>
                        <p v-else class="text-muted">No description</p>
                    </div>
                    <div v-else class="form-group">
                        <textarea
                            class="form-control"
                            rows="15"
                            placeholder="Briefly describe this character..."
                            v-model="form.description"
                            :class="{'is-invalid': errors.description }"
                        ></textarea>
                        <span
                            v-if="errors.description"
                            class="help-block text-danger d-block"
                        >{{ errors.description[0] }}</span>
                    </div>
                </div>
                <div class="card-footer" v-if="is_editing_description">
                    <button class="btn btn-success float-right" @click="saveDescription()">
                        <i class="fas fa-fw fa-check mr-1" aria-hidden="true"></i>Save
                    </button>

                    <button class="btn btn-default float-right mr-2" @click="cancelEdit()">
                        <i class="fas fa-fw fa-times mr-1" aria-hidden="true"></i>Cancel
                    </button>
                </div>
                <div class="overlay dark" v-if="loading">
                    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        crew_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            loading_tags: false,
            avatar: null,
            name: null,
            description: null,
            tags: [],
            is_editing_description: false,
            form: {},
            errors: []
        };
    },
    mounted() {
        this.getCrew();
    },
    methods: {
        getCrew() {
            this.loading = true;
            axios
                .get(`admin/crews/${this.crew_id}`)
                .then(response => {
                    this.reconstructItems(response.data.data);
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async editName() {
            const { value: editedName } = await this.$swal.fire({
                title: "Edit Name",
                input: "text",
                confirmButtonText: "Save",
                showCloseButton: true,
                showCancelButton: true,
                inputValue: this.name
            });
            if (editedName) {
                this.patchCrew({ name: editedName.trim() });
            }
        },
        editDescription() {
            this.is_editing_description = true;
            this.form.description = this.description;
        },
        saveDescription() {
            this.patchCrew({ description: this.form.description });
        },
        cancelEdit() {
            this.is_editing_description = false;
            this.form.description = null;
        },
        patchCrew(patchPayload) {
            this.loading = true;
            axios
                .patch(`admin/crews/${this.crew_id}`, patchPayload)
                .then(response => {
                    this.reconstructItems(response.data);
                    this.alertSuccess();
                    this.cancelEdit();
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    // this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        deleteCrew() {
            this.loading = true;
            axios
                .delete(`admin/crews/${this.crew_id}`)
                .then(response => {
                    this.alertSuccess();
                    window.location.href =
                        process.env.MIX_APP_URL + `/admin/crews`;
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        reconstructItems(response) {
            let { name, description, avatar, tags } = response;
            this.name = name;
            this.description = description;
            this.avatar = avatar;
            if (tags) this.tags = tags;
        },
        postTags(payload) {
            this.loading_tags = true;
            axios
                .post(`admin/crews/${this.crew_id}/tags`, payload)
                .then(response => {
                    this.tags = response.data;
                    this.alertSuccess();
                    this.$refs.tagsCard.cancelEditTags();
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading_tags = false;
                });
        },
        addTags(tags) {
            this.postTags({ tags: tags });
        },
        syncTags(tags) {
            this.postTags({ sync_tags: tags });
        },
        confirmDeleteCrew() {
            this.confirm(
                () => {
                    this.deleteCrew();
                },
                { text: "Delete this profile?" }
            );
        }
    }
};
</script>
<style scoped>
.image-avatar {
    width: 150px;
    height: auto;
    border-radius: 1rem;
}
.no-avatar {
    height: 180px !important;
    width: 150px !important;
}
.no-avatar::after {
    content: "No avatar";
    border-radius: 1rem;
    background-color: grey;
    color: white;
    height: 100%;
    display: block;
    text-align: center;
}
.card-body__description {
    height: 445px;
    overflow-y: auto;
}
</style>
