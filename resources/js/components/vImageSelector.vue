<template>
    <div class="d-block mb-2">
        <div class="container-selector">
            <img
                class="input-image-uploaded"
                src="/images/placeholders/200x250.jpg"
                alt="upload image"
                width="200"
                height="250"
                @click="showUploadImageModal()"
            />
        </div>
        <div class="row">
            <div class="col">
                <button
                    type="button"
                    class="btn btn-primary float-right"
                    data-toggle="modal"
                    data-target="#uploadImageModal"
                >Upload</button>
            </div>
        </div>

        <div
            class="modal fade"
            id="uploadImageModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <slot name="header">Upload Image</slot>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-3">
                            <img
                                class="input-image-uploaded"
                                id="uploaded-image"
                                src="/images/placeholders/200x250.jpg"
                                alt="upload image"
                                width="200"
                                height="250"
                            />
                        </div>

                        <div class="form-group">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="confirmUploadImage()"
                        >Upload</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            form: {},
            errors: [],
            file_name: null
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
        showUploadImageModal() {
            $("#uploadImageModal").modal("show");
        },
        confirmUploadImage() {
            this.confirm(() => {
                this.$emit("upload-image", this.form);
            });
        }
    }
};
</script>

<style scoped>
.container-selector {
    width: 100%;
    text-align: center;
    background-color: #bfbfbf;
}
</style>
