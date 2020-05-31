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
