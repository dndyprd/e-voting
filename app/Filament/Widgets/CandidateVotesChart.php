<?php

namespace App\Filament\Widgets;

use App\Models\Candidate;
use Filament\Widgets\ChartWidget;

class CandidateVotesChart extends ChartWidget
{
    protected ?string $heading = 'Grafik Perolehan Suara';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 8;

    protected function getData(): array
    {
        $candidates = Candidate::withCount('votes')->orderBy('order')->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Suara',
                    'data' => $candidates->pluck('votes_count')->toArray(),
                    'backgroundColor' => '#2865ff',
                    'borderColor' => '#1053fdff',
                ],
            ],
            'labels' => $candidates->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
