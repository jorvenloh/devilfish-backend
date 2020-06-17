<template>
    <div class="d-block" :class="`text-${position}`" v-if="meta && meta.last_page > 1">
        <button
            class="btn btn-light"
            @click="goToThisPage(meta.current_page - 1)"
            type="button"
            :disabled="checkPrev || loading"
        >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </button>

        <div class="d-inline mx-2">
            <button
                class="btn btn-primary btn-paginator"
                v-for="index in meta.last_page"
                :key="index"
                @click="goToThisPage(index)"
                :class="{'active' : index == meta.current_page }"
                :disabled="index == meta.current_page"
            >{{ index }}</button>
        </div>

        <button
            class="btn btn-light"
            @click="goToThisPage(meta.current_page + 1)"
            type="button"
            :disabled="checkNext || loading"
        >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: String,
            default: "center"
        },
        links: {
            type: Object,
            default: () => {}
        },
        meta: {
            type: Object,
            default: () => {}
        },
        filters: {
            type: Object,
            default: () => {}
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {};
    },

    computed: {
        checkPrev() {
            if (this.meta) {
                if (this.links.prev) return false;
            }
            return true;
        },

        checkNext() {
            if (this.meta) {
                if (this.links.next) return false;
            }
            return true;
        }
    },

    watch: {
        //items: function() {}
    },

    methods: {
        goToThisPage(pageNumber) {
            this.$emit("go-to-page", pageNumber);
        },

        goPrev() {
            this.goToPage(this.meta.current_page - 1);
        },

        goNext() {
            this.goToPage(this.meta.current_page + 1);
        },

        toggleLoading: function() {
            this.is_loading = !this.is_loading;
        }
    }
};
</script>

<style scoped>
.btn-paginator + .btn-paginator{
    margin-left: 0.5rem;
}
</style>
