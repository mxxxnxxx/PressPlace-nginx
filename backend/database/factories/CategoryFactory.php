<?php

declare(strict_types=1);

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name' => 'No Category',
        'column_order' => $faker->numberBetween(1, 52),
        'user_id' => $faker->numberBetween(1, 52),
    ];
});
