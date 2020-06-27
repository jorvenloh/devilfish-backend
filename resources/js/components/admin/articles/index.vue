<template>
    <div class="card">
        <div class="card-header">Articles</div>
        <div class="card-body">
            <v-datatable
                :numbering="true"
                :columns="columns"
                :items="articles.data"
                :paginate="true"
                :pagination="articles.pagination"
                pagination-method="get"
                :pagination-data="filters"
                class="text-capitalize"
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <a :href="`/admin/articles/${props.item.id}`">
                        {{ props.item.title || 'Untitled'}}
                        </a>
                        </td>
                    <td>{{ props.item.updated_at || '--' | toStandardDateTime(true) }}</td>
                    <td>{{ props.item.status || '--' }}</td>
                    <td width="10%" class="text-center">
                        <button
                            type="button"
                            class="btn btn-sm btn-warning"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Article"
                            @click="editArticle(props.item.id)"
                        >
                            <i class="fas fa-edit" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-success"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Preview Article"
                            @click="showArticle(props.item.id)"
                        >
                            <i class="fas fa-eye" aria-hidden="true"></i>
                        </button>
                    </td>
                </template>
            </v-datatable>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String
        }
    },
    data() {
        return {
            loading: true,
            filters: {
                status: this.status
            },
            articles: {
                data: [],
                pagination: {}
            },
            columns: [
                {
                    name: "Title",
                    field: "title"
                },
                {
                    name: "Last Update",
                    field: "updated_at"
                },
                {
                    name: "Status",
                    field: "status"
                },
                {
                    name: "Action",
                    align: "center"
                }
            ]
        };
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        getArticles() {
            this.loading = true;
            axios
                .get(`admin/articles`, {
                    params: this.filters
                })
                .then(response => {
                    this.articles.data = response.data.data;
                    this.articles.pagination.links = response.data.links;
                    this.articles.pagination.meta = response.data.meta;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        editArticle(article_id){
            this.navigate(`/admin/articles/${article_id}`, "_blank");
        },
        showArticle(article_id) {
            this.navigate(`/articles/${article_id}`, "_blank", "client");
        }
    }
};
</script>

<style>
</style>
