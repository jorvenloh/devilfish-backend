<template>
    <div>
        <button class="btn btn-outline-primary mb-3" @click="addNewImage">
            <i class="fas fa-fw fa-user mr-1" aria-hidden="true"></i>Add new image
        </button>

        <div class="card" v-if="is_adding_images">
            <div class="card-body bg-light">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>File</label>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        class="custom-file-input"
                                        @change="changeImageFileInput($event)"
                                    />
                                    <label
                                        class="custom-file-label"
                                        for="avatarInputFile"
                                    >{{ file_name || 'Choose file' }}</label>
                                </div>
                                <div class="input-group-append" v-if="form.file">
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
                                class="help-block text-danger"
                            >{{ errors.image[0] }}</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Type</label>
                            <v-select
                                class="text-capitalize"
                                v-model="form.type"
                                :options="typeOptions"
                                :reduce="type => type.value"
                            />
                            <span
                                v-if="errors.type"
                                class="help-block text-danger"
                            >{{ errors.type[0] }}</span>
                        </div>
                    </div>
                    <div class="col-12 my-3">
                        <button class="btn btn-success float-right" @click="postNewImage">
                            <i class="fas fa-fw fa-check" aria-hidden="true"></i>
                            Confirm
                        </button>
                        <button
                            class="btn btn-default float-right mr-2"
                            @click="() => {is_adding_images = !is_adding_images}"
                        >
                            <i class="fas fa-fw fa-times" aria-hidden="true"></i>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="overflow-auto">
            <table class="table table-striped table-images">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>File</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="index" v-for="(image, index) in images">
                        <td>{{index + 1}}</td>
                        <td>
                            <a href="#" @click="showImage(image.url)">{{image.uuid}}</a>
                        </td>
                        <td class="text-capitalize">
                            <a href="#">{{image.type}}</a>
                        </td>
                        <td>
                            <span>{{image.file_size | prettyBytes}}</span>
                        </td>
                        <td>
                            <button
                                class="btn btn-xs btn-danger"
                                @click="confirmDeleteImage(image.id)"
                                data-toggle="tooltip"
                                data-placement="left"
                                title="Detach image"
                            >
                                <i class="fas fa-fw fa-times" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="!images.length">
                        <td colspan="5">
                            <span class="text-muted">
                                <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                                No image found
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            class="modal fade"
            id="imageModal"
            role="dialog"
            tabindex="-1"
            aria-labelledby="imageModal"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <button type="button" class="close float-right" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <img class="image-display" v-if="show_image_url" :src="show_image_url" alt="Display Image" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            images: [],
            is_adding_images: false,
            form: {},
            file_name: "",
            type_options: {},
            errors: [],
            show_image_url: ""
        };
    },
    computed: {
        typeOptions() {
            const options = [];
            _.forEach(this.type_options, function(value, key) {
                options.push({ label: value, value: key });
            });
            return options;
        }
    },
    mounted() {
        this.getImages();
        this.getOptions();
    },
    methods: {
        getImages() {
            this.loading = true;
            axios
                .get(`admin/products/${this.product_id}/images`)
                .then(response => {
                    this.images = response.data.data;
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getOptions() {
            axios
                .get(`admin/products/${this.product_id}/images/create`)
                .then(response => {
                    this.type_options = response.data.options;
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        confirmDeleteImage(image_id) {
            this.loading = true;
            this.confirm(
                () => {
                    axios
                        .delete(
                            `admin/products/${this.product_id}/images/${image_id}`
                        )
                        .then(response => {
                            this.alertSuccess();
                            this.getImages();
                        })
                        .catch(error => {
                            this.alertError();
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                },
                { text: "Permanent this images?" }
            );
        },
        addNewImage() {
            this.is_adding_images = !this.is_adding_images;
        },
        postNewImage() {
            this.loading = true;
            this.errors = [];
            this.confirm(() => {
                const data = new FormData();
                data.append("type", this.form.type);
                data.append("image", this.form.file);
                axios
                    .post(`admin/products/${this.product_id}/images`, data)
                    .then(response => {
                        this.alertSuccess();
                        this.getImages();
                    })
                    .catch(error => {
                        this.alertError();
                        this.errors = error.response.data.errors;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        changeImageFileInput(event) {
            if (event.target.files.length) {
                let selectedFiles = event.target.files;
                this.file_name = selectedFiles[0].name;
                this.form.file = selectedFiles[0];
            }
        },
        clearImageFile() {
            this.form.image = null;
            this.file_name = null;
        },
        showImage(url) {
            this.show_image_url = url;
            $("#imageModal").modal("show");
        }
    }
};
</script>

<style scoped>
.table-images tr td:first-child,
.table-images tr td:last-child {
    width: 10%;
    text-align: center;
}
.image-display{
    max-width: 500px;
}
</style>
