<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;
use App\Enumerations\Product\Status as ProductStatus;
use App\Enumerations\Product\Type as ProductType;
use Illuminate\Support\Str;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'uuid' => Str::uuid(),
        'title' => $faker->unique()->name,
        'type' =>  $faker->randomElement(ProductType::get()),
        'status' => $faker->randomElement(ProductStatus::get()),
    ];
});
