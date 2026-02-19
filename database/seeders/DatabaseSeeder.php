<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AppSetting;
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

        AppSetting::create([
            'start_date' => now(),
            'end_date' => now()->addDays(1),
        ]);

        $this->call([
            DivisiSeeder::class,
            CandidateSeeder::class,
            VoterSeeder::class,
            PanitiaSeeder::class,
        ]);
    }
}
