<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title" v-if="article.title">{{ article.title }}</h3>
            <div class="card-tools">
                <small class="text-secondary" v-if="article.body">
                    <i class="far fa-fw fa-clock"></i>
                    Last Update {{ article.updated_at | toStandardDateTime(true) }}
                </small>
            </div>
        </div>
        <div class="card-body">{{article.body}}</div>
        <div class="card-footer">
            <div class="row">
                <div class="col text-left">
                    <div v-if="article.author">
                        <span>Author: {{article.author.username}}</span>
                    </div>
                </div>
                <div class="col text-right">
                    <button type="button" class="btn btn-success mr-1" @click="publishArticle()">
                        <i class="fas fa-share-square" aria-hidden="true"></i>
                        Publish
                    </button>
                    <button type="button" class="btn btn-primary" @click="editArticle()">
                        <i class="far fa-edit" aria-hidden="true"></i>
                        Edit
                    </button>
                </div>
            </div>
        </div>
        <div class="overlay dark" v-if="loading">
            <i class="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        articleId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            article: {}
        };
    },
    mounted() {
        this.getArticle();
    },
    methods: {
        getArticle() {
            this.loading = true;
            axios
                .get(`admin/articles/${this.articleId}`)
                .then(response => {
                    console.log(response);
                    this.article = response.data.data;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        publishArticle() {
            console.log("Publish Artcle");
        },
        editArticle() {
            console.log("Edit Artcle");
        }
    }
};
</script>

<style>
</style>
