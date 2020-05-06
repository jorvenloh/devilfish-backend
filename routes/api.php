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

Route::group(['middleware' => 'api'], function () {
    //Auth
    Route::post('login', 'Api\Auth\AuthController@login');
    Route::post('register', 'Api\Auth\AuthController@register');


});

Route::group(['middleware' => 'auth:api'], function(){

    Route::post('logout', 'Api\Auth\AuthController@logout');

    Route::group(['prefix' => 'admin'], function () {
        Route::resource('users', 'Api\Admin\UserController');
        Route::resource('roles', 'Api\Admin\RoleController');
        Route::resource('privileges', 'Api\Admin\PrivilegeController');
    });

});

