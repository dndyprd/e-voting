<?php

namespace App\Filament\Resources\Panitias;

use App\Filament\Resources\Panitias\Pages\CreatePanitia;
use App\Filament\Resources\Panitias\Pages\EditPanitia;
use App\Filament\Resources\Panitias\Pages\ListPanitias;
use App\Filament\Resources\Panitias\Schemas\PanitiaForm;
use App\Filament\Resources\Panitias\Tables\PanitiasTable;
use App\Models\User;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class PanitiaResource extends Resource
{
    protected static ?string $model = User::class;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('role', 'panitia');
    }
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-users';
    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan';
    protected static ?int $navigationSort = 2;
    
    protected static ?string $navigationLabel = 'Akun Panitia'; 
    protected static ?string $modelLabel = 'Akun Panitia'; 
    protected static ?string $pluralModelLabel = 'Akun Panitia'; 

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PanitiaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PanitiasTable::configure($table);
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
            'index' => ListPanitias::route('/'),
            'create' => CreatePanitia::route('/create'),
            'edit' => EditPanitia::route('/{record}/edit'),
        ];
    }
}
