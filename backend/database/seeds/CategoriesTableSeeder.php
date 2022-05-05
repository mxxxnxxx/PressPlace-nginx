<?php

declare(strict_types=1);
use App\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        factory(Category::class, 56)->create();
        $Categories = [
            [
                'name' => 'No Category',
                'column_order'=> 0,
                'user_id' => 53,
            ],
            [
                'name' => 'カフェ',
                'column_order'=> 1,
                'user_id' => 53,
            ],
            [
                'name' => 'キャフェ',
                'column_order'=> 2,
                'user_id' => 53,
            ],
            [
                'name' => 'キャフェ',
                'column_order'=> 3,
                'user_id' => 53,
            ],
            [
                'name' => 'キャフェ',
                'column_order'=> 4,
                'user_id' => 53,
            ],
            [
                'name' => 'キャフェ',
                'column_order'=> 5,
                'user_id' => 53,
            ],
            [
                'name' => 'キャフェ',
                'column_order'=> 6,
                'user_id' => 53,
            ],

        ];
        $dt = new Carbon();

        foreach ($Categories as $category) {
        $date = $dt->addSecond();
        $category['updated_at'] = $date;
        Category::create($category);
        }
    }
}
