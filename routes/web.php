<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes(['verify' => true]);

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('landing');
});

//Auth
Route::group(['middleware' => 'auth'], function () {

    //Guest
    Route::get('/guest/home', function () {
        return view('guest.home');
    })->name('guest.home');

    //AD/SA
    Route::group(['prefix' => 'admin', 'middleware' => ['hasRole:SA;AD'], 'as' => 'admin.'], function () {
        Route::get('/dashboard', 'Admin\DashboardController@index')->name('dashboard');

        Route::resource('/users', 'Admin\UserController', ['only' => ['index', 'show']]);
        Route::resource('/articles', 'Admin\ArticleController', ['only' => ['index', 'show', 'create', 'edit']]);
        Route::resource('/products', 'Admin\ProductController', ['only' => ['index', 'show', 'create']]);
        Route::resource('/genres', 'Admin\GenreController', ['only' => ['index']]);
        Route::resource('/crews', 'Admin\CrewController', ['except' => ['update', 'destroy']]);
        Route::resource('/tags', 'Admin\TagController', ['only' => ['index', 'show']]);
    });

    //Sole SA
    Route::group(['prefix' => 'superadmin', 'middleware' => ['hasRole:SA'], 'as' => 'superadmin.'], function () {

        Route::group(['prefix' => 'system', 'as' => 'system.'], function () {
            Route::resource('/privileges', 'Superadmin\System\PrivilegeController', ['only' => ['index', 'show']]);
            Route::get('/passport', function () {
                return view('superadmin.system.passport');
            })->name('passport');
            Route::get('/setting', function () {
                return view('superadmin.system.setting');
            })->name('setting');
        });
    });
});
