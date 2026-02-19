<?php

namespace App\Filament\Resources\Voters\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Notifications\Notification;

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
                Action::make('resetVoting')
                    ->label('Reset')
                    ->icon('heroicon-o-arrow-path')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading(fn ($record) => "Reset Status Voting")
                    ->modalDescription(fn ($record) => "Apakah anda yakin ingin mereset status voting " . strtoupper($record->name) . "?")
                    ->modalSubmitActionLabel('Yakin')
                    ->modalCancelActionLabel('Batal')
                    ->action(function ($record) {
                        $record->update(['is_voted' => false]);
                        $record->vote()->delete();

                        Notification::make()
                            ->title('Status voting berhasil direset')
                            ->success()
                            ->send();
                    }),
                EditAction::make()
                    ->visible(fn () => auth()->user()->role === 'admin'),
                DeleteAction::make()
                    ->visible(fn () => auth()->user()->role === 'admin'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn () => auth()->user()->role === 'admin'),
                ]),
            ]);
    }
}
