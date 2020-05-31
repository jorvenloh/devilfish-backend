<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes(['verify' => true]);

//Guest
Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('landing');
});

//Auth
Route::group(['middleware' => 'auth'], function(){

    //AD/SA
    Route::group(['prefix' => 'admin', 'middleware' => ['hasRole:SA;AD'], 'as' => 'admin.'], function(){
        Route::get('/home', 'Admin\HomeController@index')->name('home');
    });

    //Sole SA
    Route::group(['prefix' => 'superadmin', 'middleware' => ['hasRole:SA'], 'as' => 'superadmin.'], function(){

        Route::group(['prefix' => 'system', 'as' => 'system.'], function(){
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



