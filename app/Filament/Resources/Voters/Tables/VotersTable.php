<?php

namespace App\Filament\Resources\Voters\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class VotersTable
{
    public static function configure(Table $table): Table
    {
        return $table 
            ->emptyStateHeading('Tidak ada data')
            ->emptyStateDescription('Tidak ada data pemilih yang tersedia')
            ->columns([ 
                TextColumn::make('index')
                    ->label('No')
                    ->rowIndex(),
                TextColumn::make('name')
                    ->label('Nama Pemilih')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('auth_code')
                    ->label('Kode Auth')
                    ->searchable(),
                TextColumn::make('divisi.name')
                    ->label('Divisi')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_voted')
                    ->label('Status Vote')
                    ->boolean(), 
            ])
            ->filters([
                SelectFilter::make('divisi_id')
                    ->relationship('divisi', 'name')
                    ->label('Divisi')
                    ->placeholder('Pilih Divisi')
                    ->native(false),
                SelectFilter::make('is_voted')
                    ->label('Status Vote')
                    ->options([
                        '1' => 'Sudah Vote',
                        '0' => 'Belum Vote',
                    ])
                    ->native(false),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
