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
        $categories =[];
        for($i = 0; $i < 56; $i++){
            $categories[$i]= [
                'name' => 'No Category',
                'column_order' => 0,
                'user_id' => $i+1,
            ];
        }

            // 一秒ずらして作成
        $dt = new Carbon();

        foreach ($categories as $category) {
            $date = $dt->addSecond();
            $category['updated_at'] = $date;
            Category::create($category);
        }
    }
}
