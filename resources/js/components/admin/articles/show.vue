<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title text-capitalize" v-if="article.title">
                    <span class="right badge badge-primary">{{article.status}}</span>
                    {{ article.title }}
                </h3>
                <button
                    type="button"
                    class="btn btn-tool position-absolute mb-1"
                    @click="updateTitle"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Edit Title"
                >
                    <i class="fas fa-edit"></i>
                </button>
                <div class="card-tools">
                    <div class="d-inline text-secondary" v-if="article.author">
                        <span
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Author"
                        >{{article.author.username}}</span>
                    </div>
                    <small class="text-secondary" v-if="article.body">
                        <i class="far fa-fw fa-clock"></i>
                        Last Update {{ article.updated_at | toStandardDateTime(true) }}
                    </small>
                </div>
            </div>
            <div class="card-body">
                <div id="editorjs"></div>
            </div>
            <div class="card-footer">
                <button
                    :disabled="loading"
                    type="button"
                    class="btn btn-primary ml-2 float-right"
                    @click="saveArticle()"
                >
                    <i class="far fa-fw fa-edit" aria-hidden="true"></i>
                    Save
                </button>
                <div v-if="article.status" class="d-inline float-right">
                    <button
                        v-if="article.status == 'published'"
                        type="button"
                        class="btn btn-danger"
                        @click="updateStatus('unstaged')"
                    >
                        <i class="fas fa-fw fa-level-down-alt" aria-hidden="true"></i>
                        Unstage
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn btn-success"
                        @click="updateStatus('published')"
                    >
                        <i class="fas fa-fw fa-share-square" aria-hidden="true"></i>
                        Publish
                    </button>
                </div>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
        <shortcuts></shortcuts>
    </div>
</template>

<script>
import editor from "@/plugins/Editor";
import shortcuts from "@/components/admin/articles/shortcuts";

export default {
    components: {
        shortcuts
    },
    props: {
        articleId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            article: {},
            editor: {}
        };
    },
    created() {
        this.getArticle();
    },
    methods: {
        async getArticle() {
            this.loading = true;
            axios
                .get(`admin/articles/${this.articleId}`)
                .then(response => {
                    this.article = response.data.data;
                    this.setupEditor();
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        setupEditor() {
            this.editor = editor({ data: this.article.body });
        },
        updateStatus(status) {
            this.confirm(() => {
                this.patchArticle({ status: status });
            });
        },
        async updateTitle() {
            const { value: editedTitle } = await this.$swal.fire({
                title: "Edit Title",
                input: "text",
                confirmButtonText: "Save",
                showCloseButton: true,
                showCancelButton: true,
                inputValue: this.article.title
            });
            if (editedTitle) {
                this.patchArticle({ title: editedTitle.trim() });
            }
        },
        saveArticle() {
            this.loading = true;
            this.editor
                .save()
                .then(outputData => {
                    this.confirm(() => {
                        this.patchArticle({ body: outputData });
                    });
                })
                .catch(error => {
                    console.log("Saving failed: ", error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async patchArticle(payload) {
            this.loading = true;
            this.makeApiRequest(
                `admin/articles/${this.articleId}`,
                "patch",
                payload
            )
                .then(response => {
                    this.article = response.data.article;
                    this.alertSuccess();
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.btn-tool {
    margin: -5px -0px;
}
</style>
