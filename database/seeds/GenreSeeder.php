<?php

use Illuminate\Database\Seeder;
use App\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genre_preset = [
            ['name' => 'action'],
            ['name' => 'aventure'],
            ['name' => 'comedy'],
            ['name' => 'crime'],
            ['name' => 'drama'],
            ['name' => 'epic'],
            ['name' => 'historical'],
            ['name' => 'horror'],
            ['name' => 'musical'],
            ['name' => 'dance'],
            ['name' => 'sci-fi'],
            ['name' => 'war'],
            ['name' => 'western'],
            ['name' => 'documentary'],
            ['name' => 'thriller'],
            ['name' => 'footage'],

        ];

        foreach($genre_preset as $genre){
            if(!Genre::where('name', $genre['name'])->exists())
                Genre::create($genre);
        }
    }
}
