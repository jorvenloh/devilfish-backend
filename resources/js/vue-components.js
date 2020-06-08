Vue.component(
    'passport-clients',
    require('./components/superadmin/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/superadmin/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/superadmin/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'v-datatable',
    require('./components/VDatatable.vue').default
);

Vue.component(
    'privileges-index',
    require('./components/superadmin/privileges/index.vue').default
);

Vue.component(
    'privileges-show',
    require('./components/superadmin/privileges/show.vue').default
);

Vue.component(
    'privilege-users',
    require('./components/superadmin/privileges/users/index.vue').default
);

Vue.component(
    'privilege-roles',
    require('./components/superadmin/privileges/roles/index.vue').default
);

Vue.component(
    'articles-create',
    require('./components/admin/articles/create.vue').default
);

Vue.component(
    'articles-index',
    require('./components/admin/articles/index.vue').default
);

Vue.component(
    'articles-show',
    require('./components/admin/articles/show.vue').default
);

Vue.component(
    'products-create',
    require('./components/admin/products/create.vue').default
);

Vue.component(
    'products-index',
    require('./components/admin/products/index.vue').default
);

Vue.component(
    'products-show',
    require('./components/admin/products/show.vue').default
);

Vue.component(
    'genres-index',
    require('./components/genres/index.vue').default
);
