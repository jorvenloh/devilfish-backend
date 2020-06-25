<?php

use Illuminate\Database\Seeder;
use App\Privilege;

class PrivilegesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $privileges_preset = [
            ['name' => 'Product Manager', 'description' => 'Manage all products instances in the system, which including creation, update, delete, posting, and many more related actions'],
            ['name' => 'Article Manager', 'description' => 'Manage all article instances in the system, which including creation, update, delete, and posting'],
            ['name' => 'User Manager', 'description' => 'Manage all user instances in the system, which including suspense, release, revoke comment/posting privileges'],
            ['name' => 'Payment Manager', 'description' => 'Manage all payment instances in the system, which including verifying payment']
        ];

        foreach($privileges_preset as $privilege){
            if(!Privilege::where('name', $privilege['name'])->first())
                Privilege::create($privilege);
        }

    }
}
