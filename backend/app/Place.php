<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
    // ソフトデリート
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    // 登録用
    protected $fillable = [
        'name',
        'comment',
        'address',
        'user_id',
        'tag',
    ];

    // place_tagの多対多
    public function tags()
    {
        return $this->belongsToMany('App\Tag');
    }

    // placeがuserに属す
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    // placeがcategoriesに属す
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    // place_imageがplaceに属する
    public function place_images()
    {
        return $this->hasMany('App\Place_image');
    }

    // Usersに対しての多対多
    public function favoriteUsers()
    {
        return $this->belongsToMany('App\User', )->withTimestamps();
    }
}
