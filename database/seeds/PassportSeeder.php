<?php

use Illuminate\Database\Seeder;

class PassportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            'name' => 'Laravel Personal Access Client',
            'secret' => '9eM2gXp0vuQwkRbSqdNC53HGufayi59EWAoe2V7T',
            'redirect' => 'http://localhost',
            'personal_access_client' => '1',
            'password_client' => 0,
            'revoked' => 0,
            'created_at' => '2019-03-20 01:57:32',
            'updated_at' => '2019-03-20 01:57:32',
        ]);
        
        DB::table('oauth_clients')->insert([
            'name' => 'Laravel Password Grant Client',
            'secret' => 'chOrko5JVDjPAe6nYmrlxTxwszcJxDtBxozPoXSV',
            'redirect' => 'http://localhost',
            'personal_access_client' => '0',
            'password_client' => 1,
            'revoked' => 0,
            'created_at' => '2019-03-20 01:57:32',
            'updated_at' => '2019-03-20 01:57:32',
        ]);
        
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => 1,
            'created_at' => '2019-03-20 01:57:32',
            'updated_at' => '2019-03-20 01:57:32',
        ]);
    }
}
