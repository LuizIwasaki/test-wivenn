<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class department extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name'];

    protected $table = 'department';

    // Relationship One-to-Many with Employees (One Department has Many Employees)
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    // Relationship One-to-Many with Tasks (One Department has Many Tasks)
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
