<?php

namespace App\Filament\Widgets;

use App\Models\Candidate;
use App\Models\Divisi;
use App\Models\Voter;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        return [
            Stat::make('TOTAL DIVISI', Divisi::count())
                ->color('info')
                ->descriptionIcon('heroicon-m-building-office')
                ->chart([2, 1, 8, 3]),
            Stat::make('TOTAL PEMILIH', Voter::count())
                ->color('danger')
                ->descriptionIcon('heroicon-m-users')
                ->chart([15, 4, 10, 2, 12]),
            Stat::make('TOTAL KANDIDAT', Candidate::count())
                ->color('success')
                ->descriptionIcon('heroicon-m-user-group')
                ->chart([10, 2, 8, 4]),
            Stat::make('TOTAL SUDAH MEMILIH', Voter::where('is_voted', true)->count())
                ->color('warning')
                ->descriptionIcon('heroicon-m-check-badge')
                ->chart([15, 3, 4, 12, 10, 5, 15]),
        ];
    }
}
