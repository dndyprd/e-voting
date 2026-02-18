<?php

namespace App\Filament\Resources\Candidates\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CandidateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Kandidat')
                    ->required(),
                TextInput::make('order')
                    ->label('Nomor Urut')
                    ->required()
                    ->numeric(),
                FileUpload::make('image')
                    ->label('Foto')
                    ->disk('public')
                    ->directory('img/kandidat')
                    ->visibility('public') 
                    ->imageEditor()
                    ->imageEditorAspectRatios([
                        '1:1',
                    ])
                    ->imageEditorMode(2)
                    ->panelAspectRatio('5:4')
                    ->acceptedFileTypes([
                        'image/png',
                        'image/jpeg',
                        'image/jpg',
                        'image/webp', 
                    ]) 
                    ->getUploadedFileNameForStorageUsing(
                        function ($file, $get): string { 
                            $name = $get('name');
                            $slug = Str::slug($name);
                            $random = Str::lower(Str::random(3));
                            $extension = $file->getClientOriginalExtension(); 
                            return "kandidat-{$slug}-{$random}.{$extension}";
                        }
                    )
                    ->maxSize(1500)
                    ->image()
                    ->columnSpan(3),
                Textarea::make('vision')
                    ->label('Visi')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('mission')
                    ->label('Misi')
                    ->required()
                    ->columnSpanFull(),
                Select::make('divisi_id')
                    ->label('Divisi')
                    ->relationship('divisi', 'name')
                    ->required(),
            ]);
    }
}
