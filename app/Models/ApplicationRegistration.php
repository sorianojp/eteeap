<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'first_name',
    'middle_name',
    'last_name',
    'telephone',
    'first_priority',
    'status',
    'id_picture_path',
    'payload',
    'documents',
    'submitted_at',
])]
class ApplicationRegistration extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'payload' => 'array',
            'documents' => 'array',
            'submitted_at' => 'datetime',
        ];
    }

    public function getApplicantNameAttribute(): string
    {
        return collect([
            $this->last_name,
            $this->first_name,
            $this->middle_name,
        ])
            ->filter()
            ->join(', ');
    }
}
