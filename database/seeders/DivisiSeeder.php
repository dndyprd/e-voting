<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Divisi;

class DivisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Divisi::create([
            'name' => 'Divisi 1',
            'code' => 'D1',
        ]);

        Divisi::create([
            'name' => 'Divisi 2',
            'code' => 'D2',
        ]);

        Divisi::create([
            'name' => 'Divisi 3',
            'code' => 'D3',
        ]); 
    }
}
