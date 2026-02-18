<?php

namespace App\Filament\Resources\Candidates\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CandidateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('order')
                    ->required()
                    ->numeric(),
                FileUpload::make('image')
                    ->image()
                    ->required(),
                Textarea::make('vision')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('mission')
                    ->required()
                    ->columnSpanFull(),
                Select::make('divisi_id')
                    ->relationship('divisi', 'name')
                    ->required(),
            ]);
    }
}
