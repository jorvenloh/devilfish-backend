<template>
    <div class="card">
        <div class="card-header">Products</div>
        <div class="card-body">
            <dl class="row text-capitalize mb-0" :key="index" v-for="(product, index) in products">
                <dt class="col-sm-4 text-nowrap">{{ product.status }}</dt>
                <dd class="col-sm-8">
                    <span class="float-sm-right">{{ product.status_count }}</span>
                </dd>
            </dl>
            <button type="button" class="btn mt-2 btn-primary" @click="indexProducts()">
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
            products: {}
        };
    },
    mounted() {
        this.getProductsInfo();
    },
    methods: {
        getProductsInfo() {
            this.makeApiRequest("admin/dashboard/products").then(response => {
                this.products = response.data.products;
            });
        },
        indexProducts(){
            this.navigate('/admin/products');
        }
    }
};
</script>

<style>
</style>
