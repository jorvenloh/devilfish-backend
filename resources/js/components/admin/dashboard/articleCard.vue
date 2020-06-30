<template>
    <div class="card">
        <div class="card-header">Articles</div>
        <div class="card-body">
            <dl class="row text-capitalize mb-0" :key="index" v-for="(article, index) in articles">
                <dt class="col-sm-4 text-nowrap">{{ article.status }}</dt>
                <dd class="col-sm-8">
                    <span class="float-sm-right">{{ article.status_count }}</span>
                </dd>
            </dl>
            <button type="button" class="btn mt-2 btn-primary" @click="indexArticles()">
                <i class="fas fa-plus" aria-hidden="true"></i>
                See More
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: {}
        };
    },
    mounted() {
        this.getProductsInfo();
    },
    methods: {
        getProductsInfo() {
            this.makeApiRequest("admin/dashboard/articles").then(response => {
                this.articles = response.data.articles;
            });
        },
        indexArticles(){
            this.navigate('/admin/articles');
        }

    }
};
</script>

<style>
</style>
