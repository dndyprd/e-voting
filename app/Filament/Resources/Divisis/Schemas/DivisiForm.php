<?php

namespace App\Filament\Resources\Divisis\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DivisiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Divisi')
                    ->placeholder('Contoh: Teknik Informatika')
                    ->required(),
                TextInput::make('code')
                    ->label('Kode Divisi')
                    ->placeholder('Contoh: S1')
                    ->required(),
            ]);
    }
}
