<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place_image extends Model
{
    protected $fillable = ['place_id', 'filename'];

    public function place()
    {
        return $this->belongsTo('App\Place');
    }
}
