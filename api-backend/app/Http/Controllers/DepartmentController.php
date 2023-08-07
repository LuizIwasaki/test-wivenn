<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Department;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class DepartmentController extends Controller
{

    public function index()
    {
        $departments = Department::all();

        return response()->json(['departments' => $departments], Response::HTTP_OK);
    }

    public function show ($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['department' => $department], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|unique:department|max:30',
            ]);

            $department = new Department();

            $department->name = $request->name;

            if ($department->save()) {
                return response()->json(['message' => 'Department created successfully!'], Response::HTTP_OK);
            }

            return response()->json(['message' => 'Failed to create department!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|unique:department|max:30',
            ]);

            $department = Department::find($id);

            if (!$department) {
                return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
            }

            $department->name = $request->name;

            if ($department->save()) {
                return response()->json(['message' => 'Department updated successfully!'], Response::HTTP_OK);
            }

            return response()->json(['message' => 'Failed to update department!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function destroy($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
        }

        if ($department->delete()) {
            return response()->json(['message' => 'Department deleted successfully!'], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Failed to delete department!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function restore($id)
    {
        $department = Department::withTrashed()->find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
        }

        if ($department->restore()) {
            return response()->json(['message' => 'Department restored successfully!'], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Failed to restore department!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
