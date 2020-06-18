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
            console.log("post create prodcut");
        }
    }
};
</script>

<style>
</style>
