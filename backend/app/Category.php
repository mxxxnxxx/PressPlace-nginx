<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
    'name',
    'user_id',
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
