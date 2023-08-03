<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'assigned_id', 'due_date'];
    protected $table = 'task';

    // Relationship Many-to-One with Employee (Many Tasks belong to One Employee)
    public function assignee()
    {
        return $this->belongsTo(Employee::class, 'assigned_id');
    }

    // Relationship Many-to-One with Department (Many Tasks belong to One Department)
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
