<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{ 
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => '12345678',
            'role' => 'admin',
        ]);

        $this->call([
            DivisiSeeder::class,
            VoterSeeder::class,
        ]);
    }
}
