<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'started_at',
        'submitted_at',
        'score'
    ];

    public $timestamps = false;
}
