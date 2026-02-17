<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voter;

class VoterSeeder extends Seeder
{ 
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            Voter::create([
                'name' => fake()->name(),
                'divisi_id' => rand(1, 3),
            ]);
        }
    }
}
