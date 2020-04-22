<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'code' => 'SA',
            'name' => 'superadmin',
        ]);
        
        Role::create([
            'code' => 'AD',
            'name' => 'admin',
        ]);
        
        Role::create([
            'code' => 'US',
            'name' => 'user',
        ]);
    }
}
