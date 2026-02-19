<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voter;
use App\Models\Vote;
use App\Models\Candidate;
use Faker\Factory;

class VoterSeeder extends Seeder
{ 
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            Voter::create([
                'name' => Factory::create()->name(),
                'divisi_id' => rand(1, 3),
            ]);
        }

        $voters = Voter::all();
        $candidates = Candidate::all();

        foreach ($voters->random(min(7, $voters->count())) as $voter) {
            Vote::create([
                'voter_id' => $voter->id,
                'candidate_id' => $candidates->random()->id,
                'voted_at' => now(),
            ]);

            $voter->update(['is_voted' => true]);
        }
    }
}
