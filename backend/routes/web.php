<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use vendor\laravel\framework\src\Illuminate\Routing;
use Whoops\Run;


Route::get('/{any?}', fn() => view('place.top'))->where('any', '(?!api).+');
// // place一覧
// Route::get('/places','PlaceController@index')->name('place.index');

// // top
// // Route::get('/', function () {
// // return redirect('/places');
// // });


// // placeソフトデリート
// Route::get('place/confirmation/{id} ', 'PlaceController@confirmationSoftdelete')->name('place.confirmationSoftdelete');
// Route::get('place/delete/{id} ', 'PlaceController@softdelete')->name('place.softdelete');

// // 検索機能
// Route::get('place/serch', 'PlaceController@serch')->name('serch');
// Route::get('place/serched', 'PlaceController@serched')->name('serched');

// // メール認証していないと操作できないように指定
// Route::group(['middleware' => ['auth','verified']], function () {
//     // フォームリクエストで$errorが使えるように記述
//     Route::group(['middleware' => ['web']], function () {
//         Route::resource('user', 'UserController', ['only' =>['index', 'create', 'edit', 'update', 'store']]);
//         Route::get('user/confirmation/{user} ', 'UserController@confirmationSoftdelete')->name('user.confirmationSoftdelete');
//         Route::get('user/delete/{user} ', 'UserController@softdelete')->name('user.softdelete');
//         // 投稿フォーム用
//         Route::group(['prefix' => 'place','as' => 'place.'], function() {
//             Route::get('new', 'PlaceController@create')->name('new');
//             Route::post('', 'PlaceController@store')->name('store');
//             Route::get('edit/{id}', 'PlaceController@edit')->name('edit');
//             Route::post('update/{id}', 'PlaceController@update')->name('update');
//         });
// // フォローとアンフォロー
//         Route::group(['prefix' => 'user/{id}'], function () {
//             Route::post('follow', 'UserFollowController@store')->name('follow');
//             Route::delete('unfollow', 'UserFollowController@destroy')->name('unfollow');
//         });
//         // ajaxのapiのためのルーティング
//         Route::get('ajax/postal_search', 'PlaceController@postal_search')->name('postal_search');
//     });
// });

// // フォロー機能
// Route::group(['prefix' => 'user/{id}'], function () {
//     Route::get('followers', 'UserController@followers')->name('followers');
//     Route::get('followings', 'UserController@followings')->name('followings');
// });

// // place詳細ページ
// Route::get('/place/{id}', 'PlaceController@show')->name('place.show');
// // ユーザーのmypage
// Route::resource('user', 'UserController', ['only' =>['show']]);
// // Auth::routes();
// Auth::routes(['verify' => true]);


