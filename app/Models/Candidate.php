<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidate extends Model
{
    protected $table = 'candidates';

    protected $fillable = [
        'name',
        'order',
        'image',
        'vision',
        'mission',
        'divisi_id',
    ];

    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
