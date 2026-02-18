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
        return Inertia::render('grafik');
    }
}
