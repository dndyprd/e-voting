<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory;
use App\Models\User;

class PanitiaSeeder extends Seeder 
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 3; $i++) {
            User::create([
                'name' => Factory::create()->name(),
                'email' => Factory::create()->email(),
                'password' => Hash::make('12345678'),
                'role' => 'panitia',
            ]);
        }
    }
}
