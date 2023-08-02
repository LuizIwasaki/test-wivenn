<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'employee';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'phone',
        'department_id',
    ];

        // Relation Many-to-One with Department (Many Employees belong to One Department)
        public function department()
        {
            return $this->belongsTo(Department::class);
        }

        // Relation One-to-Many with Task (One Employee has Many Tasks)
        public function tasks()
        {
            return $this->hasMany(Task::class, 'assignee_id');
        }


}
