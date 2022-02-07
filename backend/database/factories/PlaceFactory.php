<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Place;
use Faker\Generator as Faker;

$factory->define(Place::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'address' => $faker->address,
        'comment' => $faker->realText(20),
        'user_id' => $faker->numberBetween(1, 50)
    ];
});
