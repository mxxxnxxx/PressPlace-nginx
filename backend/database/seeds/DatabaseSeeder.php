<?php

declare(strict_types=1);

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(PlacesTableSeeder::class);
        $this->call(PlaceUserSeeder::class);
        $this->call(UserFollowSeeder::class);
        $this->call(Place_imagesTableSeeder::class);
    }
}
