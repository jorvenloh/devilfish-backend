<?php

use Illuminate\Database\Seeder;

class CrewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = factory(App\Crew::class, 400)->create();
    }
}
