<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AppSetting;

class VotingController extends Controller
{
    public function index()
    {
        return Inertia::render('voting');
    }

    public function grafik()
    {
        return Inertia::render('grafik');
    }
}
