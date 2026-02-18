<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AppSetting;
use App\Models\Candidate;

class VotingController extends Controller
{
    public function index()
    {
        $candidates = Candidate::with('divisi')->orderBy('order')->get();
        return Inertia::render('voting', [
            'candidates' => $candidates
        ]);
    }

    public function grafik()
    {
        $candidates = Candidate::withCount('votes')->orderBy('order')->get()
            ->map(function ($candidate) {
                return [
                    'name' => $candidate->name,
                    'votes_count' => $candidate->votes_count + 1,
                ];
            });

        return Inertia::render('grafik', [
            'candidates' => $candidates
        ]);
    }
}
