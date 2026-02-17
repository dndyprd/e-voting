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
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if user is logged in
        if (!Auth::check()) {
            return redirect()->route('profile');
        }

        // Check voting period
        $settings = AppSetting::first();

        if ($settings && $settings->start_date) {
            $now = now();
            
            // If voting hasn't started yet
            if ($now < $settings->start_date) {
                return Inertia::render('waiting');
            }
        }

        return $next($request);
    }
}
