<?php

declare(strict_types=1);

use App\Place;
use Illuminate\Database\Seeder;

class PlaceTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($placeId = 51; $placeId < 66; $placeId++) {
            if ($placeId <= 53) {
                Place::find($placeId)->tags()->attach(1);
            }

            if ($placeId <= 56 && $placeId > 53) {
                Place::find($placeId)->tags()->attach(2);
            }

            if ($placeId <= 59 && $placeId > 56) {
                Place::find($placeId)->tags()->attach(3);
            }

            if ($placeId <= 62 && $placeId > 59) {
                Place::find($placeId)->tags()->attach(4);
            }

            if ($placeId <= 65 && $placeId > 62) {
                Place::find($placeId)->tags()->attach(5);
            }
        }
    }
}
