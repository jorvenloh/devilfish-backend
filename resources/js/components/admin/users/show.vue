<template>
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body box-profile">
                    <div class="text-center">
                        <img
                            v-if="avatar"
                            class="profile-user-img img-fluid img-circle"
                            :src="avatar"
                            alt="Avatar"
                        />
                    </div>
                    <h3 class="profile-username text-center">{{user.username || 'Anonymous'}}</h3>
                    <p class="text-muted text-center mb-0">
                        {{ user.email }}
                        <i
                            v-if="user.email_verified_at"
                            class="fas fa-check text-success"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Verified"
                        ></i>
                    </p>
                    <p
                        class="text-muted text-capitalize text-center mb-0"
                        v-if="roles.length"
                    >{{ roles[0].name }}</p>
                </div>
                <div class="overlay dark" v-if="loading">
                    <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                </div>
            </div>
            <div class="card" v-if="notEmptyObject(profile)">
                <div class="card-header">
                    <h3 class="card-title">Profile</h3>
                </div>
                <div class="card-body">
                    <dl class="row text-capitalize m-0">
                        <dt class="col-sm-4">First Name</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.first_name || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">Last Name</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.last_name || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">Gender</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.gender || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">D.O.B</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.birthday_at || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">Contact</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.contact || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">Address 1</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.address_line_one || 'N/A'}}</span>
                        </dd>
                        <dt class="col-sm-4">Address 2</dt>
                        <dd class="col-sm-8">
                            <span class="float-sm-right">{{profile.address_line_two || 'N/A'}}</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Coming Soon</h3>
                </div>
                <div class="card-body">Coming Soon</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            avatar: null,
            user: {},
            avatar: null,
            roles: {},
            profile: {}
        };
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.loading = true;
            axios
                .get(`api/admin/users/${this.userId}`)
                .then(response => {
                    this.reconstructItems(response.data.data);
                })
                .catch(error => {
                    this.alertError();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        reconstructItems(response) {
            let { avatar, roles, profile, ...userData } = response;
            this.user = userData;
            this.avatar = avatar;
            this.roles = roles;
            this.profile = profile;
        }
    }
};
</script>
<style scoped>
</style>
