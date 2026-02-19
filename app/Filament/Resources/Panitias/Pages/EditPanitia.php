<?php

namespace App\Filament\Resources\Panitias\Pages;

use App\Filament\Resources\Panitias\PanitiaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPanitia extends EditRecord
{
    protected static string $resource = PanitiaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
