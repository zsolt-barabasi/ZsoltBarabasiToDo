<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /** @use HasFactory<\Database\Factories\TodoFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
    ];

    public static function getAllSorted()
    {
        $collection = collect(Todo::all());
        return $collection->sortBy('created_at')->values()->all();
    }
}
