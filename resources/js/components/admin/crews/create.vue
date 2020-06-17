<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">
                <i class="fas fa-plus-circle"></i>
                Create New Crew
            </h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="input-image m-auto">
                        <img
                            class="input-image-uploaded"
                            id="uploaded-image"
                            src="/images/placeholders/200x250.jpg"
                            alt="upload image"
                            width="200"
                            height="250"
                        />
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="avatarInputFile">Avatar</label>
                        <div class="input-group">
                            <div class="custom-file">
                                <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    class="custom-file-input"
                                    id="avatarInputFile"
                                    @change="changeImageFileInput($event)"
                                />
                                <label
                                    class="custom-file-label"
                                    for="avatarInputFile"
                                >{{ file_name || 'Choose file' }}</label>
                            </div>
                            <div class="input-group-append" v-if="form.image">
                                <button
                                    @click="clearImageFile()"
                                    class="input-group-text bg-danger"
                                    id
                                >Cancel</button>
                            </div>
                        </div>
                        <small
                            class="form-text text-muted"
                        >Recommend using image files of less than 100 KB</small>
                        <span
                            v-if="errors.image"
                            class="help-block text-danger d-block"
                        >{{ errors.image[0] }}</span>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="Full name (Recommend)"
                            v-model="form.name"
                            :class="{'is-invalid': errors.name }"
                        />
                        <span
                            v-if="errors.name"
                            class="help-block text-danger d-block"
                        >{{ errors.name[0] }}</span>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Briefly describe this character..."
                            id="description"
                            v-model="form.description"
                            :class="{'is-invalid': errors.description }"
                        ></textarea>
                        <span
                            v-if="errors.description"
                            class="help-block text-danger d-block"
                        >{{ errors.description[0] }}</span>
                    </div>

                    <div class="form-group">
                        <label for="name">#HashTags</label>
                        <v-select
                            v-model.trim="form.tags"
                            taggable
                            multiple
                            :options="tag_options"
                            @search="onTagsSearch"
                        ></v-select>
                        <small class="form-text text-muted">
                            <span class="text-danger">Dont't add # prefix</span> as it will generated automatically in display
                        </small>
                        <span
                            v-if="errors.tags"
                            class="help-block text-danger d-block"
                        >{{ errors.tags[0] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-success float-right" @click="saveCrew()">
                <i class="fas fa-fw fa-check mr-1" aria-hidden="true"></i>Confirm
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: "",
                description: "",
                image: null,
                tags: []
            },
            loading: false,
            errors: [],
            file_name: null,
            tag_options: [],
            tag_searching_threshold: 2
        };
    },

    methods: {
        changeImageFileInput(event) {
            if (event.target.files.length) {
                let selectedFiles = event.target.files;
                this.file_name = selectedFiles[0].name;
                this.form.image = selectedFiles[0];
                document.getElementById(
                    "uploaded-image"
                ).src = window.URL.createObjectURL(selectedFiles[0]);
            }
        },

        clearImageFile() {
            this.form.image = null;
            this.file_name = null;
            document.getElementById("uploaded-image").src =
                "/images/placeholders/200x250.jpg";
        },

        onTagsSearch(search, loading) {
            if (search.length >= this.tag_searching_threshold) {
                loading(true);
                axios
                    .get(`tags`, { params: { name: search } })
                    .then(response => {
                        this.tag_options = response.data;
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
                    .finally(() => {
                        loading(false);
                    });
            }
        },

        saveCrew() {
            this.confirm(() => {
                this.loading = true;
                this.errors = [];

                const data = new FormData();
                data.append("name", this.form.name);
                data.append("description", this.form.description);
                data.append("image", this.form.image);
                _.forEach(this.form.tags, function(value) {
                    data.append("tags[]", value);
                });

                axios
                    .post(`admin/crews`, data)
                    .then(response => {
                        this.alertSuccess();
                        this.clearForm();
                    })
                    .catch(error => {
                        console.log(error);
                        this.alertError();
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        clearForm() {
            this.form = {
                image: null
            };
            this.clearImageFile();
        }
    }
};
</script>

<style scoped>
.input-image {
    height: 250px;
    width: 200px;
    text-align: center;
}
.input-image-uploaded {
    position: relative;
    border-radius: 2rem;
}
</style>
