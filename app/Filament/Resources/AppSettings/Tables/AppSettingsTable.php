<?php

namespace App\Filament\Resources\AppSettings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Carbon\Carbon;

class AppSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama'),
                TextColumn::make('start_date')
                    ->label('Tanggal Mulai')
                    ->formatStateUsing(fn ($state) => Carbon::parse($state)->format('d M Y H:i')),
                TextColumn::make('end_date')
                    ->label('Tanggal Selesai')
                    ->formatStateUsing(fn ($state) => Carbon::parse($state)->format('d M Y H:i')),
            ])
            ->filters([
                //
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
