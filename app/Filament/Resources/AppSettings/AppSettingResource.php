<?php

namespace App\Filament\Resources\AppSettings;

use App\Filament\Resources\AppSettings\Pages\CreateAppSetting;
use App\Filament\Resources\AppSettings\Pages\EditAppSetting;
use App\Filament\Resources\AppSettings\Pages\ListAppSettings;
use App\Filament\Resources\AppSettings\Schemas\AppSettingForm;
use App\Filament\Resources\AppSettings\Tables\AppSettingsTable;
use App\Models\AppSetting;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AppSettingResource extends Resource
{
    protected static ?string $model = AppSetting::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-clock';
    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan';
    protected static ?int $navigationSort = 3;
    
    protected static ?string $navigationLabel = 'Jadwal Pemilihan'; 
    protected static ?string $modelLabel = 'Jadwal Pemilihan'; 
    protected static ?string $pluralModelLabel = 'Jadwal Pemilihan'; 

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return AppSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AppSettingsTable::configure($table);
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
            'index' => ListAppSettings::route('/'), 
            'edit' => EditAppSetting::route('/{record}/edit'),
        ];
    }
}
