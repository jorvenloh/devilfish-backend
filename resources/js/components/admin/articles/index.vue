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
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.title || '--'}}</td>
                    <td>{{ props.item.updated_at || '--' | toStandardDateTime(true) }}</td>
                    <td>{{ props.item.status || '--' }}</td>
                    <td width="10%" class="text-center">
                        <button
                            type="button"
                            class="btn btn-sm btn-success"
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
            type: String,
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
                    console.log(error.response);
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        showArticle(article_id) {
            window.location.href = process.env.MIX_APP_URL + `/admin/articles/${article_id}`;
        }
    }
};
</script>

<style>
</style>
