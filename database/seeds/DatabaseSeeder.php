<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(PrivilegesSeeder::class);
        $this->call(GenreSeeder::class);

        if (config('app.env') == 'local') {
    	    $this->call([
    	        PassportSeeder::class,
    	    ]);
    	}

    }
}
