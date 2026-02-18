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
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('auth_code')
                    ->required(),
                Select::make('divisi_id')
                    ->relationship('divisi', 'name')
                    ->required(),
                Toggle::make('is_voted')
                    ->required(),
            ]);
    }
}
