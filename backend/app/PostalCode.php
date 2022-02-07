<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostalCode extends Model
{
    public $timestamps = false;
    protected $guarded = ['id'];
    // 郵便番号からデータベースの住所を検索する
    public function scopeWhereSearch($query, $first_code, $last_code)
    {
        \Debugbar::info("te");
        $query->where('first_code', intval($first_code))
            ->where('last_code', $last_code);
    }
    // Accessorで郵便番号に0をつけて使えるようにする
    public function getFirstCodeAttribute($value)
    {

        return str_pad($value, 3, '0', STR_PAD_LEFT);
    }

    public function getLastCodeAttribute($value)
    {

        return str_pad($value, 4, '0', STR_PAD_LEFT);
    }
}
