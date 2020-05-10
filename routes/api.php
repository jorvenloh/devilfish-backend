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

    Route::group(['prefix' => 'email', 'as' => 'verification.'], function () {
        Route::post('resend', 'Api\Auth\VerificationController@resend')->middleware('throttle:60,1')->name('resend');
        Route::get('verify', 'Api\Auth\VerificationController@show')->name('notice');
        Route::get('verify/{id}/{hash}', 'Api\Auth\VerificationController@verify')->middleware('throttle:60,1')->name('verify');
    });

});

Route::group(['middleware' => 'auth:api', 'as' => 'api.'], function(){

    Route::post('logout', 'Api\Auth\AuthController@logout')->name('logout');
    Route::group(['middleware' => 'verified', 'prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('users', 'Api\Admin\UserController');
        Route::resource('roles', 'Api\Admin\RoleController');
        Route::resource('privileges', 'Api\Admin\PrivilegeController');
    });

});

