<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place_image extends Model
{
    protected $fillable = ['place_id', 'image_path'];

    public function place()
    {
        return $this->belongsTo('App\Place');
    }
}
