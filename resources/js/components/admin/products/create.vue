<template>
    <div class="card">
        <div class="card-header">Create New</div>
        <div class="card-body">
            <div class="form-group">
                <label for="title">Product Title</label>
                <input
                    type="email"
                    class="form-control"
                    id="title"
                    placeholder="Enter title"
                    v-model="form.title"
                    :class="{'is-invalid': errors.title }"
                />
                <span
                    v-if="errors.title"
                    class="help-block text-danger d-block"
                >{{ errors.title[0] }}</span>
            </div>
            <div class="form-group">
                <label>Type</label>
                <v-select v-model="form.type" :reduce="type => type.value" :options="ProductTypesOptions"></v-select>
                <span
                    v-if="errors.type"
                    class="help-block text-danger d-block"
                >{{ errors.type[0] }}</span>
            </div>

        </div>
        <div class="card-footer text-right">
            <button type="button" class="btn btn-success" @click="postCreateProduct()">
                <i class="far fa-fw fa-save mr-1" aria-hidden="true"></i>Save
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectOptions: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            form: {
                title: "",
                type: "movie"
            },
            errors: []
        };
    },
    computed: {
        ProductTypesOptions() {
            return JSON.parse(this.selectOptions).product_type;
        }
    },
    mounted() {},
    methods: {
        postCreateProduct() {
            this.confirm(() => {
                this.loading = true;
                this.errors = [];
                axios
                    .post(`api/admin/products`, this.form)
                    .then(response => {
                        this.alertSuccess();
                        this.navigateToProductShow(response.data.product.id);
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
        navigateToProductShow(product_id){
            window.location.href = process.env.MIX_APP_URL + `/admin/products/${product_id}`;
        }

    }
};
</script>

<style>
</style>
