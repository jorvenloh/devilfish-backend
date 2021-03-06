<template>
    <div>
        <div class="card">
            <div class="card-header">Genres</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-5">
                        <input
                            class="form-control"
                            type="text"
                            v-model="filters.name"
                            v-on:keyup.enter="getGenres"
                            placeholder="Search"
                        />
                    </div>
                    <div class="col">
                        <button
                            type="button"
                            class="btn btn-default text-capitalize mr-2"
                            @click="getGenres()"
                        >
                            <i class="fas fa-search"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-success" @click="storeGenre()">
                    <i class="fas fa-plus"></i>
                    Add New Genre
                </button>
            </div>

            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <button class="btn btn-default btn-badge mr-2">Found {{genres.length}}</button>
                <div v-if="current_filters" class="d-inline">
                    <button class="btn btn-warning btn-badge">{{current_filters}}</button>
                    <button
                        type="button"
                        class="btn btn-outline-danger ml-2"
                        @click="resetFilters()"
                    >
                        <i class="fas fa-times"></i>
                        Clear
                    </button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <button
                    type="button"
                    class="btn btn-light mr-2 mb-2 text-capitalize"
                    v-for="genre in GenreSorted"
                    :key="genre.id"
                    @click="showActionButton(genre)"
                >
                    {{ genre.name }}
                    <span class="right badge badge-success" v-if="genre.is_new">New</span>
                    <span class="right badge badge-warning" v-else-if="genre.is_edited">Edited</span>
                </button>

                <div class="d-block mt-1 p-3 text-center bg-light" v-if="GenreSorted.length == 0">
                    <i class="far fa-folder-open"></i>
                    No result found
                </div>
            </div>
            <div class="card-footer text-right" v-if="notEmptyObject(genre)">
                <button
                    type="button"
                    class="btn btn-warning mr-2 text-capitalize"
                    @click="editGenre()"
                >
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button
                    type="button"
                    class="btn btn-danger text-capitalize"
                    :disabled="loading"
                    @click="deleteGenre()"
                >
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
            <div class="overlay dark" v-if="loading">
                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            filters: {
                name: ""
            },
            genres: [],
            genre: {},
            errors: [],
            current_filters: null
        };
    },
    computed: {
        GenreSorted() {
            return _.orderBy(this.genres, ["name"], ["asc"]);
        }
    },
    mounted() {
        this.getGenres();
    },
    methods: {
        getGenres() {
            this.loading = true;
            axios
                .get(`api/admin/genres`, {
                    params: this.filters
                })
                .then(response => {
                    const { data: genres, current_filters } = response.data;
                    this.genres = genres;
                    this.current_filters = current_filters;
                })
                .catch(error => {
                    this.alertError({}, error.response.data.errors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        resetFilters() {
            this.filters = {};
            this.getGenres();
        },

        async storeGenre() {
            const { value: newGenreTitle } = await this.$swal.fire({
                title: "New Genre",
                input: "text",
                inputPlaceholder: "Enter new genre title",
                confirmButtonText: "Create",
                showCancelButton: true
            });

            if (newGenreTitle) {
                axios
                    .post(`api/admin/genres`, { name: newGenreTitle })
                    .then(response => {
                        //append new to index
                        let new_genre = response.data.genre;
                        new_genre.is_new = true;
                        this.genres.push(new_genre);
                        this.alertSuccess();
                    })
                    .catch(error => {
                        this.alertError();
                        this.errors = error.response.data.errors;
                    });
            }
        },

        showActionButton(genre) {
            this.genre = genre;
        },

        async editGenre() {
            const { value: editedGenreTitle } = await this.$swal.fire({
                title: "Edit Genre",
                input: "text",
                confirmButtonText: "Save",
                inputValue: this.genre.name
            });

            if (editedGenreTitle) {
                axios
                    .patch(`api/admin/genres/${this.genre.id}`, {
                        name: editedGenreTitle.trim().toLowerCase()
                    })
                    .then(response => {
                        let edited_genre = response.data.genre;
                        edited_genre.is_edited = true;
                        _.remove(this.genres, n => {
                            return n.id == this.genre.id;
                        });
                        this.genres.push(edited_genre);
                        this.alertSuccess();
                        //this.getGenres();
                        this.genre = {};
                    })
                    .catch(error => {
                        this.alertError();
                        this.errors = error.response.data.errors;
                    });
            }
        },

        deleteGenre() {
            if (this.genre.id) {
                this.loading = true;
                this.confirm(() => {
                    axios
                        .delete(`api/admin/genres/${this.genre.id}`)
                        .then(response => {
                            this.alertSuccess();
                            this.getGenres();
                            this.genre = {};
                        })
                        .catch(error => {
                            this.alertError({}, error.response.data.errors);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
