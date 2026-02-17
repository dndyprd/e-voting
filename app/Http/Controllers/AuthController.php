<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voter;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'auth_code' => 'required|string',
        ]);

        $voter = Voter::where('auth_code', $request->auth_code)->first();

        if ($voter) {
            Auth::guard('voter')->login($voter);
            return redirect()->route('profile');
        }

        return back()->withErrors([
            'auth_code' => 'Kode akses tidak valid.',
        ]);
    }

    public function logout(Request $request)
    {
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        } elseif (Auth::guard('voter')->check()) {
            Auth::guard('voter')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
