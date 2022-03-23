<?php

declare(strict_types=1);

use App\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::create([
            'id' => 1,
            'name' => '飲食',
        ]);
        Tag::create([
            'id' => 2,
            'name' => 'アパレル',
        ]);
        Tag::create([
            'id' => 3,
            'name' => 'カフェ',
        ]);
        Tag::create([
            'id' => 4,
            'name' => '美術館',
        ]);
        Tag::create([
            'id' => 5,
            'name' => 'ライブハウス',
        ]);
    }
}
