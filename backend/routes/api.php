<?php

use App\Http\Controllers\FavoriteController;
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

// DEMO用のルーティング
// 公開時にはメール認証周りを設定
// User新規作成機能停止


// place検索機能
Route::get('/places/search', 'PlaceController@search')->name('search');
// 郵便番号自動入力
Route::get('/ajax/postal_search', 'PlaceController@postal_search')->name('postal_search');

// place情報取得
Route::get('/places ', 'PlaceController@index')->name('place.index');
Route::get('/place/{placeId} ', 'PlaceController@show')->name('place.show');

// placeをお気に入りにUserのリスト取得
Route::get('/place/favorite/users/{placeId} ', 'PlaceController@placeFavoriteUsers')->name('place.favoriteUsers');

// User新規登録
// Route::post('/register', 'CookieAuthenticationController@register');

// メールアドレス認証
// Route::get('/email/verify/{id}/{hash}', 'VerifyEmailController@verify')
// ->middleware(['signed', 'throttle:6,1'])
// ->name('verification.verify');

// メールアドレス認証メール再送
// Route::post('/email/verify/resend', function (Request $request) {
// $request->user()->sendEmailVerificationNotification();
// return back()->with('message', 'Verification link sent!');
// })->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');


// ログインログアウト
Route::post('/login', 'CookieAuthenticationController@login')->name('login');
Route::post('/logout', 'CookieAuthenticationController@logout')->name('logout');

// ユーザー情報取得
Route::get('/user/info/{userName}','UserController@show')->name('user.show');


// User編集
Route::patch('user/{userId}','UserController@update')->name('user.update');
// Userごとのplace情報取得
Route::get('/user/places','UserController@userPlaces')->name('user.places');
Route::get('/user/favorite/places','UserController@favoritePlaces')->name('user.favoritePlaces');

// フォロー系のリスト
Route::get('/user/followings/{userName}','UserController@followings')->name('user.followings');
Route::get('/user/followers/{userName}','UserController@followers')->name('user.followers');



// Laravel-sanctumでログイン認証時にしか行えないようにしたルート
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user/me', 'UserController@current')->name('user');
    // テスト版のため停止中
    // Route::get('/user/delete', 'UserController@softdelete')->name('user.softdelete');

    // メールアドレス認証済みユーザーのみアクセス可能
    Route::middleware(['verified'])->group(function(){
        // Route::post('/user/email', 'ChangeEmailController@sendChangeEmailLink');
    });

    Route::post('/user/email', 'ChangeEmailController@sendChangeEmailLink');

    Route::get('/user/email/reset/{token}', 'ChangeEmailController@reset');

    Route::group(['prefix' => '/user/{id}'], function () {
        Route::post('follow', 'UserFollowController@store')->name('follow');
        Route::delete('unfollow', 'UserFollowController@destroy')->name('unfollow');
    });
    Route::post('/places ', 'PlaceController@store')->name('place.store');
    Route::patch('/places/{placeId} ', 'PlaceController@update')->name('place.update');
    Route::post('/places/{placeId}/favorite','FavoriteController@store')->name('place.favorite');
    Route::delete('/places/{placeId}/unfavorite','FavoriteController@destroy')->name('place.unfavorite');
    Route::get('/places/delete/{id} ', 'PlaceController@softdelete')->name('place.softdelete');
});
