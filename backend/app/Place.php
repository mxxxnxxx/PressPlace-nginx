<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Place extends Model{
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
    // place_tagのリレーション
    public function tags(){
        return $this->belongsToMany('App\Tag');
    }
// placeがuserに属す
    public function user(){
        return $this->belongsTo('App\User');
    }
    // place_imageがplaceに属する
    public function place_images(){
        return $this->hasMany('App\Place_image');
    }

    // Usersに対してのお気に入り機能
    public function favoriteUsers()
    {
        return $this->belongsToMany('App\User',)->withTimestamps();
    }

}
