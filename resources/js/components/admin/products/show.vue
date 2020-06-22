<template>
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Profile</h3>
                    <div class="card-tools" v-if="notEmptyObject(product)">
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
                            class="dropdown-menu dropdown-menu-right text-capitalize"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <a class="dropdown-item" href="#" @click="updateTitle()">Edit Title</a>
                            <a
                                class="dropdown-item"
                                href="#"
                                @click="updateStatus()"
                            >{{ actionStatus == 'published' ? 'publish' : 'unstage'}} Product</a>
                            <div class="dropdown-divider"></div>
                            <a
                                class="dropdown-item text-danger"
                                href="#"
                                @click="confirmDeleteProduct"
                            >
                                <i class="fas fa-fw fa-trash-alt" aria-hidden="true"></i>
                                Delete Profile
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <v-image-selector
                        v-on:upload-image="postUploadPoster"
                        ref="imageSelector"
                        :display_image_url="product.poster"
                    >
                        <template #header>Upload Poster</template>
                    </v-image-selector>

                    <dl class="row text-capitalize m-0">
                        <dt class="col-sm-4">Title</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{product.title}}</span>
                        </dd>
                        <dt class="col-sm-4">Type</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{product.type}}</span>
                        </dd>
                        <dt class="col-sm-4">Status</dt>
                        <dd class="col-sm-8">
                            <span
                                class="float-sm-right status"
                                :class="'status__'+product.status"
                            >{{product.status}}</span>
                        </dd>
                        <dt class="col-sm-4">Created At</dt>
                        <dd class="col-sm-8">
                            <span
                                class="float-sm-right"
                            >{{product.created_at | toStandardDateTime(true)}}</span>
                        </dd>
                        <dt class="col-sm-4">Last update</dt>
                        <dd class="col-sm-8">
                            <span
                                class="float-sm-right"
                            >{{product.updated_at | toStandardDateTime(true)}}</span>
                        </dd>
                    </dl>
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
        <div class="col-md-8">
            <div class="card">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" href="#synopsis" data-toggle="tab">Synopsis</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#videos" data-toggle="tab">Videos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#crews" data-toggle="tab">Crews</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#images" data-toggle="tab">Images</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#reviews" data-toggle="tab">Reviews</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#discussions" data-toggle="tab">Discussions</a>
                        </li>
                    </ul>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="synopsis">Synopsis</div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="videos">Videos</div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="crews">Crews</div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="images">Images</div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="reviews">Reviews</div>
                        <!-- /.tab-pane -->
                        <div class="tab-pane" id="discussions">Discussion</div>
                        <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- /.card-body -->
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
            product: {},
            videos: [],
            images: [],
            crews: [],
            tags: [],
            loading_tags: false,
            is_editing_synopsys: false,
            form: {},
            errors: []
        };
    },
    computed: {
        actionStatus() {
            if (this.product.status == "published") return "unstaged";
            if (this.product.status == "saved") return "published";
            if (this.product.status == "unstaged") return "published";
        }
    },
    mounted() {
        this.getProduct();
    },
    methods: {
        getProduct() {
            this.loading = true;
            axios
                .get(`admin/products/${this.product_id}`)
                .then(response => {
                    this.reconstructItems(response.data);
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        reconstructItems(response) {
            let { data, videos, images, crews, tags } = response;
            this.product = data;
            this.videos = videos;
            this.images = images;
            this.crews = crews;
            this.tags = tags;
        },
        patchProduct(payload) {
            this.loading = true;
            this.confirm(() => {
                axios
                    .patch(`admin/products/${this.product_id}`, payload)
                    .then(response => {
                        this.alertSuccess();
                        this.product = response.data;
                    })
                    .catch(error => {
                        this.alertError();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        confirmDeleteProduct() {
            this.confirm(
                () => {
                    this.deleteProduct();
                },
                { text: "Delete this profile?" }
            );
        },
        async updateTitle() {
            const { value: editedTitle } = await this.$swal.fire({
                title: "Edit Title",
                input: "text",
                confirmButtonText: "Save",
                showCloseButton: true,
                showCancelButton: true,
                inputValue: this.product.title
            });
            if (editedTitle) {
                this.patchProduct({ title: editedTitle.trim() });
            }
        },
        updateStatus() {
            const data = { status: this.actionStatus };
            this.patchProduct(data);
        },
        deleteProduct() {
            this.loading = true;
            axios
                .delete(`admin/products/${this.product_id}`)
                .then(response => {
                    this.alertSuccess();
                    this.navigateToProductIndex();
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        navigateToProductIndex() {
            window.location.href = process.env.MIX_APP_URL + `/admin/products`;
        },
        postTags(payload) {
            this.loading_tags = true;
            axios
                .post(`admin/products/${this.product_id}/tags`, payload)
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
        postUploadPoster(file) {
            this.loading = true;
            this.errors = [];
            const data = new FormData();
            if (file) data.append("poster", file);
            axios
                .post(`admin/products/${this.product_id}/images`, data)
                .then(response => {
                    this.product.poster = response.data.poster;
                    this.$refs.imageSelector.uploadSuccess();
                })
                .catch(error => {
                    this.$refs.imageSelector.handleError(
                        error.response.data.errors.poster[0]
                    );
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "resources/sass/_variables";
.status__saved {
    color: $green;
}
.status__published {
    color: $blue;
}
.status__unstaged {
    color: $red;
}
</style>
