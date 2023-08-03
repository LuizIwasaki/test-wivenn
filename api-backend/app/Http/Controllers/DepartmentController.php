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

    public function store(Request $request)
    {
        if (!Auth::user()) {
            return response()->json(['message' => 'Unauthorized!'], Response::HTTP_UNAUTHORIZED);
        }

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
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }
}
