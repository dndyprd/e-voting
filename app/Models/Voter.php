<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Voter extends Model
{
    protected $table = 'voters';

    protected $fillable = [
        'name',
        'auth_code',
        'divisi_id',
        'is_voted',
    ];

    protected $hidden = [
        'auth_code',
    ];

    protected function casts(): array
    {
        return [
            'is_voted' => 'boolean',
        ];
    }

    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class);
    }

    public function vote(): HasOne
    {
        return $this->hasOne(Vote::class);
    }
}
