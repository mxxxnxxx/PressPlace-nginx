<?php

use App\Http\Controllers\UserController;
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
Route::get('/user/me', 'UserController@current')->name('user');
Route::get('/user/delete', 'UserController@softdelete')->name('user.softdelete');
Route::get('/user/places','UserController@userPlaces')->name('user.places');
Route::get('/user/{userName}','UserController@show')->name('user.show');
Route::apiResource('/user','UserController', ['only' =>['update']]);
Route::post('/register', 'Auth\RegisterController@register')->name('register');
    // Route::middleware('auth:api')->get('/user', function (Request $request) {
    //     return $request->user();
    // });
Route::group(['prefix' => 'user/{id}'], function () {
    Route::post('follow', 'UserFollowController@store')->name('follow');
    Route::delete('unfollow', 'UserFollowController@destroy')->name('unfollow');
});
Route::get('/user/followings/{userName}','UserController@followings')->name('user.followings');
Route::get('/user/followers/{userName}','UserController@followers')->name('user.followers');
Auth::routes(['verify' => true]);
