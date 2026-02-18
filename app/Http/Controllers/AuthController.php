<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\AuthCodeMail;

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

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $voter = Voter::where('name', $request->name)->first();

        if (!$voter) {
            return back()->withErrors([
                'name' => 'Nama tidak terdaftar sebagai pemilih.',
            ]);
        }

        // Update email
        $voter->email = $request->email;
        $voter->save();

        // Send the actual email
        try {
            Mail::to($voter->email)->send(new AuthCodeMail($voter->auth_code, $voter->name));
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return back()->withErrors([
                'email' => 'Gagal mengirim email. Silakan periksa konfigurasi email atau hubungi admin.',
            ]);
        }

        return back()->with('success', 'Permintaan berhasil! Silakan cek email Anda untuk mendapatkan kode akses.');
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
