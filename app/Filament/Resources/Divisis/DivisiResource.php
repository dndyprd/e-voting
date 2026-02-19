<?php

namespace App\Filament\Resources\Divisis;

use App\Filament\Resources\Divisis\Pages\CreateDivisi;
use App\Filament\Resources\Divisis\Pages\EditDivisi;
use App\Filament\Resources\Divisis\Pages\ListDivisis;
use App\Filament\Resources\Divisis\Schemas\DivisiForm;
use App\Filament\Resources\Divisis\Tables\DivisisTable;
use App\Models\Divisi;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class DivisiResource extends Resource
{
    protected static ?string $model = Divisi::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';
    protected static string|UnitEnum|null $navigationGroup = 'Manajemen Data';
    protected static ?int $navigationSort = 2;
    
    protected static ?string $navigationLabel = 'Data Divisi'; 
    protected static ?string $modelLabel = 'Data Divisi'; 
    protected static ?string $pluralModelLabel = 'Data Divisi'; 

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return DivisiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DivisisTable::configure($table);
    }

    public static function canViewAny(): bool
    {
        return Auth::user()->role === 'admin';
    }

    public static function canCreate(): bool
    {
        return Auth::user()->role === 'admin';
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
            'index' => ListDivisis::route('/'),
            'create' => CreateDivisi::route('/create'),
            'edit' => EditDivisi::route('/{record}/edit'),
        ];
    }
}
