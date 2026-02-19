<?php

namespace App\Filament\Resources\Panitias\Pages;

use App\Filament\Resources\Panitias\PanitiaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPanitias extends ListRecords
{
    protected static string $resource = PanitiaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
