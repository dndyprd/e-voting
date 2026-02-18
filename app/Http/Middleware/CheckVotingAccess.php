<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AppSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CheckVotingAccess
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user is logged in (either web or voter guard)
        if (!Auth::guard('web')->check() && !Auth::guard('voter')->check()) {
            return redirect()->route('profile');
        }

        // Check voting period
        $settings = AppSetting::first();

        if ($settings && $settings->start_date) {
            $now = now();
            
            // If voting hasn't started yet
            if ($now < $settings->start_date) {
                return redirect()->route('home')->with('warning', 'Sesi voting belum dimulai! Silakan tunggu hingga waktu yang ditentukan.');
            }

            if ($now > $settings->end_date) {
                return redirect()->route('home')->with('warning', 'Sesi voting telah berakhir! Terima kasih atas partisipasi Anda.');
            }
        }

        return $next($request);
    }
}
