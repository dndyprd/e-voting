<?php

namespace App\Filament\Resources\AppSettings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Schema;

class AppSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                DateTimePicker::make('start_date'),
                DateTimePicker::make('end_date'),
            ]);
    }
}
