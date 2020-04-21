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
Route::resource('users', 'Api\Admin\TransactionController');

Route::group(['middleware' => 'api', 'as' => 'api.'], function () {
    //Auth
    Route::post('login', 'Api\LoginController@login');
    Route::post('register', 'Api\RegisterController@register');

    Route::resource('users', 'Api\Admin\TransactionController');

});

Route::group(['middleware' => 'auth:api'], function(){
	

});
