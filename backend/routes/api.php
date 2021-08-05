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
Route::get('/places/search', 'PlaceController@search')->name('search');
Route::get('/ajax/postal_search', 'PlaceController@postal_search')->name('postal_search');
Route::get('/places/delete/{id} ', 'PlaceController@softdelete')->name('place.softdelete');
Route::apiResource('/places','PlaceController');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/users/me', 'UserController@show')->name('user');
Route::apiResource('/user','UserController', ['only' =>['show', 'edit', 'update']]);
    Route::post('/register', 'Auth\RegisterController@register')->name('register');
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
Auth::routes(['verify' => true]);
