<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Crew;
use Faker\Generator as Faker;

$factory->define(Crew::class, function (Faker $faker) {
    return [
        'name' => $faker->userName,
        'description' => $faker->paragraph,
    ];
});
