<?php

namespace App\Filament\Resources\Panitias\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Hidden;

class PanitiaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Panitia')
                    ->placeholder('Masukkan nama panitia')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('email')
                    ->label('Email')
                    ->placeholder('Masukkan email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('password')
                    ->label('Password')
                    ->placeholder('Masukkan password')
                    ->minLength(8)
                    ->password()
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $context): bool => $context === 'create'),
                Hidden::make('role')
                    ->default('panitia'),
            ]);
    }
}
