<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <label for="title" class="col-sm-2 col-form-label font-weight-normal">
                        <i class="fas fa-heading"></i>
                        Title
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="Untitled"
                            v-model="article.title"
                        />
                    </div>
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
                <button type="button" class="btn btn-success" @click="saveArticle()">
                    <i class="far fa-fw fa-save mr-1" aria-hidden="true"></i>Save
                </button>
            </div>
        </div>

        <div class="card mb-5">
            <div class="card-header">
                <i class="fas fa-code"></i>
                Content Elements
            </div>
            <div class="card-body">
                <dl class="row">
                    <dt class="col-sm-2">Header</dt>
                    <dd class="col-sm-10">'CTRL+SHIFT+H'</dd>
                    <dt class="col-sm-2">
                        Embed
                        <i class="fab fa-youtube"></i>
                    </dt>
                    <dd class="col-sm-10">Paste the URL of the embed - Supported Youtube & Coub</dd>
                    <dt class="col-sm-2">Embed Link</dt>
                    <dd class="col-sm-10">'CTRL+SHIFT+A' - Insert links back to own products</dd>
                    <dt class="col-sm-2">Simple Image</dt>
                    <dd class="col-sm-10">Paste the URL of the image</dd>
                    <dt class="col-sm-2">List</dt>
                    <dd class="col-sm-10">'CMD+SHIFT+Q'</dd>
                    <dt class="col-sm-2">Quote</dt>
                    <dd class="col-sm-10">'CMD+SHIFT+O'</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
//import editor from "@/plugins/Editor";

export default {
    data() {
        return {
            article: {
                title: "",
                body: ""
            },
            loading: false
        };
    },
    methods: {
        saveArticle() {
            editor
                .save()
                .then(outputData => {
                    this.article.body = outputData;
                    this.confirm(() => {
                        axios
                            .post(`admin/articles`, this.article)
                            .then(response => {
                                this.alertSuccess();
                                editor.clear();
                                this.clearForm();
                            })
                            .catch(error => {
                                this.alertError({}, error.response.data.errors);
                            });
                    });
                })
                .catch(error => {
                    console.log("Saving failed: ", error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    clearForm() {
        this.article = {
            title: "",
            body: ""
        };
    }
};
</script>

<style>
</style>
