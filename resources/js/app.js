/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
require('admin-lte');
require('./vue-components');
require('./vue-filters');
require('./plugins/VueSelect');
require('./plugins/Popper');

//Passports
const passportClients = () => import( /* webpackChunkName: "passport-clients" */ './components/superadmin/passport/Clients.vue');
const passportAuthorizedClients = () => import( /* webpackChunkName: "passport-authorized-clients" */ './components/superadmin/passport/AuthorizedClients.vue');
const passportPersonalAccessTokens = () => import( /* webpackChunkName: "passport-personal-access-token" */ './components/superadmin/passport/PersonalAccessTokens.vue');

//Dashboard
const dashboard = () => import( /* webpackChunkName: "dashboard" */ './components/admin/dashboard/index.vue');

//Articles
const articleCreate = () => import( /* webpackChunkName: "article-create" */ './components/admin/articles/create.vue');
const articlesIndex = () => import( /* webpackChunkName: "articles-index" */ './components/admin/articles/index.vue');
const articlesShow = () => import( /* webpackChunkName: "articles-show" */ './components/admin/articles/show.vue');

//Users
const usersIndex = () => import( /* webpackChunkName: "users-index" */ './components/admin/users/index.vue');
const userShow = () => import( /* webpackChunkName: "user-show" */ './components/admin/users/show.vue');



// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: {
        passportClients,
        passportAuthorizedClients,
        passportPersonalAccessTokens,
        dashboard,
        articleCreate,
        articlesIndex,
        articlesShow,
        usersIndex,
        userShow
    }
});
