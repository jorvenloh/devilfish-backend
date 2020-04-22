<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	User::create([
    		'username' => 'DEVILFISH.SA', 
    		'email' => 'devilfish.sa@gmail.com', 
    		'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    	])->roles()->attach(Role::where('name', 'superadmin')->first());

    	factory(App\User::class, 4)->create()->each(function ($item, $key) {
		    $item->roles()->attach(Role::where('name', 'admin')->first());
		});

		factory(App\User::class, 45)->create()->each(function ($item, $key) {
		    $item->roles()->attach(Role::where('name', 'user')->first());
		});
        
    }
}
