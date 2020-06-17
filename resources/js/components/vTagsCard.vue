<template>
    <div class="card card-primary">
        <div class="card-header">
            <h3 class="card-title">Tags</h3>
            <div class="card-tools" v-if="tags.length">
                <button
                    type="button"
                    class="btn btn-tool"
                    @click="editTags"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Edit tags"
                >
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <div class="mb-3" v-if="sortedTags.length">
                <div v-if="!is_editing_tags">
                    <h4 class="d-inline mr-2" :key="index" v-for="(item, index) in sortedTags">
                        <span class="badge badge-light text-primary">#{{item.name}}</span>
                    </h4>
                </div>
                <div v-else>
                    <div class="d-inline">
                        <button
                            :key="index"
                            v-for="(item, index) in form.sync_tags"
                            class="btn btn-sm btn-danger mr-2 mb-2"
                            @click="removeTags(index)"
                        >
                            #{{item.name}}
                            <i class="fas fa-fw fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mb-3 text-center" v-else>
                <span class="text-muted">
                    <i class="fas fa-info-circle" aria-hidden="true"></i>
                    No tag found
                </span>
            </div>
            <div>
                <v-tag-input v-if="!is_editing_tags" v-on:save-tags="postTags"></v-tag-input>
                <button
                    v-if="is_editing_tags"
                    class="btn btn-success float-right mr-2"
                    @click="saveSyncTags()"
                >
                    <i class="fas fa-fw fa-check mr-1" aria-hidden="true"></i>Save
                </button>
                <button
                    v-if="is_editing_tags"
                    class="btn btn-default float-right mr-2"
                    @click="cancelEditTags()"
                >
                    <i class="fas fa-fw fa-times mr-1" aria-hidden="true"></i>Cancel
                </button>
            </div>
        </div>
        <div class="overlay dark" v-if="loading">
            <i class="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
    </div>
</template>

<script>
//import vTagInput  from '@/components/vTagsCard'
export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    computed: {
        sortedTags() {
            return _.orderBy(this.tags, "name", "asc");
        }
    },
    data() {
        return {
            is_editing_tags: false,
            form: {
                sync_tags: []
            }
        };
    },
    methods: {
        editTags() {
            this.is_editing_tags = true;
            this.form.sync_tags = _.cloneDeep(this.sortedTags);
        },
        cancelEditTags() {
            this.is_editing_tags = false;
            this.form.sync_tags = [];
        },
        saveSyncTags() {
            let sync_tags = _.map(this.form.sync_tags, "id");
            this.$emit("sync-tags", sync_tags);
        },
        postTags(tags) {
            this.$emit("add-tags", tags);
        },
        removeTags(index) {
            this.form.sync_tags.splice(index, 1);
        }
    }
};
</script>

<style>
</style>
