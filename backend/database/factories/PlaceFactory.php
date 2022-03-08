<?php

declare(strict_types=1);

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Place;
use Faker\Generator as Faker;

$factory->define(Place::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'address' => $faker->address,
        'comment' => 'demoのため住所は異なります',
        'user_id' => $faker->numberBetween(1, 50),
    ];
});
