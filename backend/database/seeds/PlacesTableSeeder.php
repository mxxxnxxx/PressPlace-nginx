<?php

declare(strict_types=1);

use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        factory(App\Place::class, 50)->create();
    }
}
