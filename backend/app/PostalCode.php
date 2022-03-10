<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostalCode extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    // 郵便番号からデータベースの住所を検索する
    public function scopeWhereSearch($query, $first_code, $last_code): void
    {
        $query->where('first_code', (int) $first_code)
            ->where('last_code', $last_code);
    }

    // Accessorで郵便番号に0をつけて使えるようにする
    public function getFirstCodeAttribute($value)
    {
        // $valueをストリングに変更
        $valueStr = (string) $value;
        return str_pad($valueStr, 3, '0', STR_PAD_LEFT);
    }

    public function getLastCodeAttribute($value)
    {
        // $valueをストリングに変更
        $valueStr = (string) $value;
        return str_pad($valueStr, 4, '0', STR_PAD_LEFT);
    }
}
