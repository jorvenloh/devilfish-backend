<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api', 'as' => 'api.'], function () {
    //Auth
    Route::post('login', 'Api\Auth\AuthController@login')->name('login');
    Route::post('register', 'Api\Auth\AuthController@register')->name('register');
    Route::post('forgot-password', 'Api\Auth\ForgotPasswordController@sendResetLinkEmail')->name('forgot-password');
    Route::post('reset-password', 'Api\Auth\ResetPasswordController@reset')->name('reset-password');

    //Email verification
    Route::group(['prefix' => 'email', 'as' => 'verification.'], function () {
        Route::post('resend', 'Api\Auth\VerificationController@resend')->middleware('throttle:60,1')->name('resend');
        Route::get('verify', 'Api\Auth\VerificationController@show')->name('notice');
        Route::get('verify/{id}/{hash}', 'Api\Auth\VerificationController@verify')->middleware('throttle:60,1')->name('verify');
    });

    //guest
    Route::resource('genres', 'Api\GenreController', ['only' => ['index']]);
    Route::resource('tags', 'Api\TagController', ['only' => ['index']]);

});

Route::group(['middleware' => 'auth:api', 'as' => 'api.'], function(){

    //Auth
    Route::get('/validate-token', function () {
        return ['data' => ['is_token_valid'=> true, 'message' => 'Token is valid']];
    })->middleware('auth:api');
    Route::post('logout', 'Api\Auth\AuthController@logout')->name('logout');
    Route::get('me', 'Api\Auth\AuthController@getMe')->name('me');

    //Admin
    Route::group(['middleware' => 'verified', 'prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('users', 'Api\Admin\UserController');
        Route::resource('genres', 'Api\Admin\GenreController', ['except' => ['create', 'edit']]);

        //Articles
        Route::get('articles/options/status', 'Api\Admin\ArticleController@statusOptions')->name('products.options.status');
        Route::get('articles/options/author', 'Api\Admin\ArticleController@authorOptions')->name('products.options.author');
        Route::resource('articles', 'Api\Admin\ArticleController', ['except' => ['create', 'edit']]);

        //Crews
        Route::get('crews/options', 'Api\Admin\CrewController@selectOptions')->name('crews.options');
        Route::resource('crews', 'Api\Admin\CrewController', ['except' => ['create', 'edit']]);
        Route::group(['prefix' => 'crews/{crew}', 'as' => 'crews.{crew}.'], function () {
            Route::resource('products', 'Api\Admin\Crew\ProductController', ['except' => ['create', 'edit']]);
            Route::resource('images', 'Api\Admin\Crew\ImageController', ['except' => ['create', 'edit']]);
            Route::resource('tags', 'Api\Admin\Crew\TagController', ['only' => ['store']]);
        });

        //Products
        Route::get('products/options', 'Api\Admin\ProductController@selectOptions')->name('products.options');
        Route::resource('products', 'Api\Admin\ProductController', ['except' => ['create', 'edit']]);
        Route::group(['prefix' => 'products/{product}', 'as' => 'products.{product}.'], function () {
            Route::resource('images', 'Api\Admin\Product\ImageController', ['except' => ['edit']]);
            Route::resource('tags', 'Api\Admin\Product\TagController', ['only' => ['store']]);
            Route::get('crews/roles', 'Api\Admin\Product\CrewController@roleOptions')->name('crews.roles.options');
            Route::resource('crews', 'Api\Admin\Product\CrewController', ['only' => ['index', 'store', 'update', 'destroy']]);
        });

        //Tags
        Route::get('tags/options', 'Api\Admin\TagController@selectOptions')->name('tags.options');
        Route::resource('tags', 'Api\Admin\TagController', ['only' => ['index', 'show']]);

        //Dashboard
        Route::get('dashboard/users', 'Api\Admin\DashboardController@usersData');
        Route::get('dashboard/products', 'Api\Admin\DashboardController@productsData');
        Route::get('dashboard/articles', 'Api\Admin\DashboardController@articlesData');
    });

    //Superadmin
    Route::group(['middleware' => 'verified', 'prefix' => 'superadmin', 'as' => 'superadmin.'], function () {

        Route::resource('privileges', 'Api\Superadmin\PrivilegeController', ['only' => ['index', 'show', 'update']]);
        Route::resource('roles', 'Api\Superadmin\RoleController', ['only' => ['index']]);
        Route::group(['prefix' => 'privileges/{privilege}', 'as' => 'privileges.{privilege}.'], function () {
            Route::resource('users', 'Api\Superadmin\Privilege\UserController', ['only' => ['index', 'store', 'destroy']]);
            Route::resource('roles', 'Api\Superadmin\Privilege\RoleController', ['only' => ['index', 'store', 'destroy']]);
        });

        //Route::resource('roles', 'Api\Superadmin\RoleController');
    });

});

