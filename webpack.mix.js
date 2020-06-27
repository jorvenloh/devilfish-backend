const mix = require('laravel-mix');

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js/')
        },
    },
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
});

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .copyDirectory('resources/images', 'public/images');

/*
 ** Documentation refer: https://laravel-mix.com/docs/5.0/extract
 */
// mix.extract(['vue', 'jquery']);


