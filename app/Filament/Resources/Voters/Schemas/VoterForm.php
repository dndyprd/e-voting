<?php

namespace App\Filament\Resources\Voters\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema; 

class VoterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Pemilih')
                    ->placeholder('Contoh: Dandy Pradnyana')
                    ->columnSpanFull()
                    ->required(),
                Select::make('divisi_id')
                    ->relationship('divisi', 'name')
                    ->label('Divisi') 
                    ->placeholder('Pilih Divisi')
                    ->native(false)
                    ->columnSpanFull()
                    ->required(),
            ]);
    }
}
