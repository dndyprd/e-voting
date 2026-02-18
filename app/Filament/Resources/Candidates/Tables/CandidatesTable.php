<?php

namespace App\Filament\Resources\Candidates\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CandidatesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateHeading('Tidak ada data')
            ->emptyStateDescription('Tambahkan data kandidat')
            ->columns([ 
                TextColumn::make('order')
                    ->label('No')
                    ->numeric(),
                ImageColumn::make('image')
                    ->label('Foto')
                    ->height(100)
                    ->disk('public'),
                TextColumn::make('name')
                    ->label('Nama Kandidat')
                    ->searchable(),
                TextColumn::make('divisi.name')
                    ->label('Divisi')
                    ->badge(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
