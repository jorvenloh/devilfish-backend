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

const articleCreate = () => import( /* webpackChunkName: "article-create" */ './components/admin/articles/create.vue');
const articlesIndex = () => import( /* webpackChunkName: "articles-index" */ './components/admin/articles/index.vue');
const articlesShow = () => import( /* webpackChunkName: "articles-show" */ './components/admin/articles/show.vue');


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
        articleCreate,
        articlesIndex,
        articlesShow
    }
});
