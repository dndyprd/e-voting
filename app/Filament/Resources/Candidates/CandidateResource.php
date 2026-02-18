<?php

namespace App\Filament\Resources\Candidates;

use App\Filament\Resources\Candidates\Pages\CreateCandidate;
use App\Filament\Resources\Candidates\Pages\EditCandidate;
use App\Filament\Resources\Candidates\Pages\ListCandidates;
use App\Filament\Resources\Candidates\Pages\ViewCandidate;
use App\Filament\Resources\Candidates\Schemas\CandidateForm;
use App\Filament\Resources\Candidates\Schemas\CandidateInfolist;
use App\Filament\Resources\Candidates\Tables\CandidatesTable;
use App\Models\Candidate;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CandidateResource extends Resource
{
    protected static ?string $model = Candidate::class; 

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-user-plus';
    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Data';
    protected static ?int $navigationSort = 1;
    
    protected static ?string $navigationLabel = 'Data Kandidat'; 
    protected static ?string $modelLabel = 'Data Kandidat'; 
    protected static ?string $pluralModelLabel = 'Data Kandidat'; 

    protected static ?string $recordTitleAttribute = 'name'; 

    public static function form(Schema $schema): Schema
    {
        return CandidateForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CandidateInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CandidatesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCandidates::route('/'),
            'create' => CreateCandidate::route('/create'),
            'view' => ViewCandidate::route('/{record}'),
            'edit' => EditCandidate::route('/{record}/edit'),
        ];
    }
}
