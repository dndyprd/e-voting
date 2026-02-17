<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Voter extends Authenticatable
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

    // Disable password requirement for voter authentication
    public function getAuthPassword()
    {
        return null;
    }

    // Auto Generate
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($voter) {
            if (empty($voter->auth_code)) {
                $voter->auth_code = static::generateAuthCode();
            }
        });
    }

    // Generate unique auth code
    public static function generateAuthCode(): string
    {
        do {
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            
            for ($i = 0; $i < 7; $i++) {
                $code .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (static::where('auth_code', $code)->exists());

        return $code;
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
