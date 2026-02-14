<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/voting', function () {
    return Inertia::render('voting');
})->name('voting');

Route::get('/grafik', function () {
    return Inertia::render('grafik');
})->name('grafik');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');
