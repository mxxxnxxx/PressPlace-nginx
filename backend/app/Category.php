<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    // ソフトデリート
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
    'name',
    'user_id',
    'column_order'
    ];

    // categoryがuserに属す
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function places()
    {
        return $this->hasMany('App\Place');
    }
}
