<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VotingController;
use App\Http\Middleware\CheckVotingAccess;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([CheckVotingAccess::class])->group(function () {
    Route::get('/voting', [VotingController::class, 'index'])->name('voting');
    Route::get('/grafik', [VotingController::class, 'grafik'])->name('grafik');
});

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');
