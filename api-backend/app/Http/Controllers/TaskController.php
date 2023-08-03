<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Task;
class TaskController extends Controller
{
    public function index()
    {
        return response()->json(['tasks' => Task::all(['id', 'title', 'description', 'assigned_id', 'due_date'])], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|max:100',
                'description' => 'required|max:100',
                'assigned_id' => 'required',
            ]);

            $employee = Employee::find($request->assigned_id);
            if (!$employee) {
                return response()->json(['message' => 'Employee not found!'], Response::HTTP_NOT_FOUND);
            }

            $task = new Task();

            $task->title = $request->title;
            $task->description = $request->description;
            $task->due_date = $request->due_date ?? null;
            $task->assigned_id = $request->assigned_id;

            if ($task->save()) {
                return response()->json(['message' => 'Task created successfully!'], Response::HTTP_OK);
            }

            return response()->json(['message' => 'Failed to create task!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
