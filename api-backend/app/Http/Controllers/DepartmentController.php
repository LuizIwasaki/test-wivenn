<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Department;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{

    public function index() {
        $departments = Department::all();

        return response()->json(['departments' => $departments], Response::HTTP_OK);
    }

    public function store(Request $request) {

        if(!Auth::user()) {
            return response()->json(['message' => 'Unauthorized!'], Response::HTTP_UNAUTHORIZED);
        }

        $request->validate([
            'name' => 'required|unique:department|max:255',
        ]);

        $department = new Department();

        $department->name = $request->name;

        if($department->save()) {
            return response()->json(['message' => 'Department created successfully!'], Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'Failed to create department!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
