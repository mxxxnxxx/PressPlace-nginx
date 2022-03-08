<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name'];

    // placeと多対多
    public function places()
    {
        return $this->belongsToMany('App\Place');
    }
}
