<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Untitled"
                        v-model="form.title"
                    />
                    <span
                        v-if="errors.title"
                        class="help-block text-danger d-block"
                    >{{ errors.title[0] }}</span>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="far fa-file-alt"></i>
                    Content
                </h3>
            </div>
            <div class="card-body">
                <div id="editorjs"></div>
            </div>
            <div class="card-footer text-right">
                <button
                    :disabled="loading"
                    type="button"
                    class="btn btn-success"
                    @click="saveArticle()"
                >
                    <i class="far fa-fw fa-save mr-1" aria-hidden="true"></i>Save
                </button>
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
    data() {
        return {
            form: {
                title: "",
                body: ""
            },
            loading: false,
            editor: {},
            errors: []
        };
    },
    created() {
        this.loading = true;
        this.editor = editor();
        this.editor.isReady
            .then(() => {
                this.loading = false;
                console.log("Editor.js is ready to work!");
            })
            .catch(reason => {
                console.log(
                    `Editor.js initialization failed because of ${reason}`
                );
            });
    },
    methods: {
        saveArticle() {
            this.loading = true;
            this.editor
                .save()
                .then(outputData => {
                    this.form.body = outputData;
                    console.log(outputData);
                    this.confirm(() => {
                        axios
                            .post(`admin/articles`, this.form)
                            .then(response => {
                                this.alertSuccess();
                                this.clearForm();
                                this.navigate(
                                    `/admin/articles/${response.data.article.id}`,
                                    "_self"
                                );
                            })
                            .catch(error => {
                                console.log(error);
                                this.errors = error.response.data.errors;
                                this.alertError({}, error.response.data.errors);
                            });
                    });
                })
                .catch(error => {
                    console.log("Mat 7", error);
                    console.log("Saving failed: ", error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        clearForm() {
            this.editor.clear();
            this.form = {};
        }
    }
};
</script>

<style>
</style>
