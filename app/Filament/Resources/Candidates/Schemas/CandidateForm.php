<?php

namespace App\Filament\Resources\Candidates\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Illuminate\Support\Str;

class CandidateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([ 
                Grid::make(2)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Foto')
                            ->disk('public')
                            ->directory('img/kandidat')
                            ->visibility('public') 
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '3:4',
                            ])
                            ->imageEditorMode(2)
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
                            ->extraAttributes(['style' => 'height: 100%']),
                        Group::make([
                            TextInput::make('name')
                                ->label('Nama Kandidat')
                                ->placeholder('Masukkan nama kandidat')
                                ->required(),
                            TextInput::make('order')
                                ->label('Nomor Urut')
                                ->placeholder('Masukkan nomor urut')
                                ->required()
                                ->numeric(),
                            Select::make('divisi_id')
                                ->label('Divisi')
                                ->placeholder('Pilih divisi')
                                ->relationship('divisi', 'name')
                                ->native(false)
                                ->required(),
                        ]),
                    ])->columnSpanFull(),
                Textarea::make('visi')
                    ->label('Visi')
                    ->placeholder('Masukkan visi kandidat')
                    ->required()
                    ->columnSpanFull(),
                Repeater::make('misi')
                    ->label('Misi')
                    ->itemLabel(fn (array $state, $uuid, $component): string => 'Misi ' . (array_search($uuid, array_keys($component->getState())) + 1))
                    ->schema([
                        TextInput::make('item')
                            ->placeholder('Masukkan misi kandidat')
                            ->hiddenLabel()
                            ->required(),
                    ])
                    ->afterStateHydrated(function ($state, $set) {
                        if (is_array($state) && count($state) > 0 && !is_array(reset($state))) {
                            $set('misi', array_map(fn($item) => ['item' => $item], $state));
                        }
                    })
                    ->dehydrateStateUsing(function ($state) {
                        return collect($state)->pluck('item')->toArray();
                    })
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
