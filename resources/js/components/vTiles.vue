<template>
    <div>
        <div class="d-flex flex-wrap" v-if="notEmptyObject(this.items)">
            <div class="card card-tile" v-for="item in items" :key="item.id">
                <slot name="displayImage" v-bind:item="item">
                    <div class="no-avatar"></div>
                </slot>

                <div class="card-body">
                    <slot name="navigation" v-bind:item="item"></slot>
                </div>
            </div>
        </div>
        <div class="d-block mt-1 p-5 text-center bg-light" v-else>
            <span class="text-muted">
                <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                No result found
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
.card-tile {
    max-width: 144px;
    margin-right: 1rem;
}
.no-avatar {
    height: 180px !important;
    width: 144px !important;
}
.no-avatar::after {
    content: "No Image";
    background-color: grey;
    color: white;
    height: 100%;
    display: block;
    text-align: center;
}
.tile-name {
    white-space: nowrap;
    text-overflow: hidden;
}
.card-body {
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
