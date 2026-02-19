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
use Filament\Forms\Components\FileUpload;
use App\Models\Divisi;
use App\Models\Voter;
use OpenSpout\Reader\XLSX\Reader;
use OpenSpout\Writer\XLSX\Writer;
use OpenSpout\Common\Entity\Row;
use Illuminate\Support\Facades\Storage;

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
                Action::make('importExcel')
                    ->label('Import Excel')
                    ->icon('heroicon-o-document-arrow-up')
                    ->color('success')
                    ->modalHeading('Import Data Pemilih dari Excel')
                    ->modalDescription('Unggah file Excel untuk mengimport data pemilih. Pastikan format file memiliki kolom "Nama" dan "Divisi" (berisi Kode Divisi). Catatan: Sebaiknya hapus data sebelumnya jika ingin menghindari duplikasi nama.')
                    ->form([
                        FileUpload::make('file')
                            ->label('File Excel (.xlsx)')
                            ->required()
                            ->disk('local')
                            ->directory('temp-imports')
                            ->acceptedFileTypes(['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
                    ])
                    ->action(function (array $data) {
                        $filePath = storage_path('app/private/' . $data['file']);
                        
                        if (!file_exists($filePath)) {
                            Notification::make()
                                ->title('File tidak ditemukan')
                                ->danger()
                                ->send();
                            return;
                        }

                        $reader = new Reader();
                        $reader->open($filePath);

                        $importedCount = 0;
                        $skippedCount = 0;

                        foreach ($reader->getSheetIterator() as $sheet) {
                            foreach ($sheet->getRowIterator() as $index => $row) {
                                // OpenSpout indices are 1-based, index 1 is usually header
                                if ($index === 1) continue;

                                $cells = $row->getCells();
                                $name = isset($cells[0]) ? $cells[0]->getValue() : null;
                                $divisiCode = isset($cells[1]) ? $cells[1]->getValue() : null;

                                if (empty($name) || empty($divisiCode)) {
                                    $skippedCount++;
                                    continue;
                                }

                                $divisi = Divisi::where('code', $divisiCode)->first();
                                if ($divisi) {
                                    Voter::create([
                                        'name' => $name,
                                        'divisi_id' => $divisi->id,
                                        'is_voted' => false,
                                    ]);
                                    $importedCount++;
                                } else {
                                    $skippedCount++;
                                }
                            }
                        }

                        $reader->close();
                        unlink($filePath);

                        Notification::make()
                            ->title("Import Berhasil")
                            ->body("$importedCount data berhasil diimport, $skippedCount data gagal/dilewati.")
                            ->success()
                            ->send();
                    })
                    ->visible(fn () => auth()->user()->role === 'admin'),

                Action::make('exportExcel')
                    ->label('Export Excel')
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('info')
                    ->action(function () {
                        $writer = new Writer();
                        $fileName = 'Data_Pemilih_' . date('Ymd_His') . '.xlsx';
                        $directory = storage_path('app/public');
                        
                        if (!file_exists($directory)) {
                            mkdir($directory, 0755, true);
                        }
                        
                        $filePath = $directory . '/' . $fileName;
                        
                        $writer->openToFile($filePath);

                        // Header
                        $writer->addRow(Row::fromValues(['Nama', 'Divisi', 'Status Vote']));

                        // Data
                        Voter::with('divisi')->chunk(100, function ($voters) use ($writer) {
                            foreach ($voters as $voter) {
                                $writer->addRow(Row::fromValues([
                                    $voter->name,
                                    $voter->divisi?->name ?? '-',
                                    $voter->is_voted ? 'Sudah Vote' : 'Belum Vote'
                                ]));
                            }
                        });

                        $writer->close();

                        return response()->download($filePath)->deleteFileAfterSend();
                    })
                    ->visible(fn () => auth()->user()->role === 'admin'),

                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->visible(fn () => auth()->user()->role === 'admin'),
                ]),
            ]);

    }
}
