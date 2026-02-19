<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AppSetting;
use App\Models\Candidate;
use App\Models\Voter;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class VotingController extends Controller
{
    public function index()
    {
        $candidates = Candidate::with('divisi')->orderBy('order')->get();
        return Inertia::render('voting', [
            'candidates' => $candidates
        ]);
    }

    public function vote(Request $request)
    {
        $voter = Auth::guard('voter')->user();

        if (!$voter) {
            return redirect()->back()->with('error', 'Anda harus login sebagai pemilih untuk memberikan suara.');
        }

        if ($voter->is_voted) {
            return redirect()->back()->with('error', 'Anda sudah melakukan voting sebelumnya.');
        }

        $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
        ]);

        \DB::transaction(function () use ($voter, $request) {
            Vote::create([
                'voter_id' => $voter->id,
                'candidate_id' => $request->candidate_id,
                'voted_at' => now(),
            ]);

            $voter->update([
                'is_voted' => true
            ]);
        });

        return redirect()->route('home')->with('success', 'Terima kasih! Suara Anda telah berhasil direkam.');
    }

    public function reset()
    {
        $voters = Voter::all();
        foreach ($voters as $voter) {
            $voter->update([
                'is_voted' => false
            ]);
        }
        return redirect()->back()->with('success', 'Status voting berhasil direset');
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
