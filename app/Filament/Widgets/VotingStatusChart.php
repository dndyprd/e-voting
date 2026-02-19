<?php

namespace App\Filament\Widgets;

use App\Models\Voter;
use Filament\Widgets\ChartWidget;

class VotingStatusChart extends ChartWidget
{
    protected ?string $heading = 'Grafik Suara Pemilih';

    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 4;

    protected function getData(): array
    {
        $votedCount = Voter::where('is_voted', true)->count();
        $notVotedCount = Voter::where('is_voted', false)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Status Voting',
                    'data' => [$votedCount, $notVotedCount],
                    'backgroundColor' => [
                        '#10b981',
                        '#f43f5e',
                    ],
                ],
            ],
            'labels' => ['Total Sudah Voting', 'Total Belum Voting'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
