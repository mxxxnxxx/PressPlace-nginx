<?php

declare(strict_types=1);

use App\Place_image;
use Illuminate\Database\Seeder;

class Place_imagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 数値の可読性が乏しいため補足
        // placeTableSeederで'id'カラム 51~65 におもなリアルなでもデータを記述している
        for ($i = 1; $i < 16; $i++) {
            $placeId = 50 + $i;
            // placeが50個demoデータとして用意しているため+50
            for ($imgIndex = 0; $imgIndex < 3; $imgIndex++) {
                $placeImagePath = "place_images/${placeId}_${imgIndex}.jpg";
                Place_image::create([
                    'place_id' => $placeId,
                    'image_path' => $placeImagePath,
                ]);
            }
        }
    }
}
