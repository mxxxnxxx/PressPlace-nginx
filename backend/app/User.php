<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Notifications\PasswordResetNotification;

class User extends Authenticatable implements MustVerifyEmailContract
{
    // メール認証での記述
    use MustVerifyEmail, Notifiable;

    // 論理削除機能
    use SoftDeletes;

    // protected $table = 'users';
    // protected $dates = ['deleted_at'];
    // protected $fillable = ['body'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */


     protected $fillable = [
        'id','name', 'email', 'password', 'user_image', 'introduction', 'age','page','userId'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
// userがplaceを所有する1対多
    public function places()
    {
        return $this->hasMany('App\place');
    }


// ユーザのフォロー中のユーザを取得する
    public function followings()
    {
        return $this->belongsToMany(User::class, 'user_follow', 'user_id', 'follow_id')->withTimestamps();
    }


// ユーザーのフォロワーを取得する
    public function followers()
    {
        return $this->belongsToMany(User::class, 'user_follow', 'follow_id', 'user_id')->withTimestamps();
    }


// 重複してフォローしていないかを関数化
// コントローラー側でしていしたユーザーが
// 引数にで指定したユーザーをフォローしているか確認している
    public function is_following($userId)
    {
        return $this->followings()->where('follow_id', $userId)->exists();
    }

    // "コントローラーでfindしたユーザー"の'フォロワー'のなかに"ログインしているユーザー"がいるかどうか
    // つまりログインユーザーが開いたotherUserをフォローしているかどうか
    // Authコントローラーを汚さないためこちらに記述
    public function in_is_following($auth_id)
    {
        return $this->followers()->where('user_id', $auth_id)->exists();
    }

    public function follow($userId)
    {
    // すでにフォロー済みではないか？
        $existing = $this->is_following($userId);
    // フォローする相手がユーザ自身ではないか？
        $myself = $this->id == $userId;

    // フォロー済みではない、かつフォロー相手がユーザ自身ではない場合、フォロー
    if (!$existing && !$myself) {
        $this->followings()->attach($userId);
    }
    }

    public function unfollow($userId)
    {
    // すでにフォロー済みではないか？
        $existing = $this->is_following($userId);
    // フォローする相手がユーザ自身ではないか？
        $myself = $this->id == $userId;

    // すでにフォロー済みならば、フォローを外す
    if ($existing && !$myself) {
        $this->followings()->detach($userId);
    }
    }

    public function sendPasswordResetNotification($token)
    {
    $this->notify(new PasswordResetNotification($token));
    }

    // placesに対してお気に入り機能
    public function favoritePlaces()
    {
        return $this->belongsToMany('App\Place')->withTimestamps();
    }

}
