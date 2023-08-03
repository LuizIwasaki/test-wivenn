<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use App\Models\Employee;
use App\Models\Department;

class EmployeeController extends Controller
{
    public function index()
    {
        return response()->json(['employees' => Employee::all(['id', 'first_name', 'last_name', 'email', 'phone', 'department_id'])], Response::HTTP_OK);
    //    $employee = Employee::find(1);
    //    dd($employee->department()->first()->name);
    }

    public function store(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'first_name' => 'required|max:100',
                'last_name' => 'required|max:100',
                'email' => 'required|unique:employee|max:100|email',
                'password' => 'required|max:100',
                'phone' => 'max:30',
                'department_id' => 'required',
            ]);

            $department = Department::find($request->department_id);
            if (!$department) {
                return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
            }

            $employee = new Employee();

            $employee->first_name = $request->first_name;
            $employee->last_name = $request->last_name;
            $employee->email = $request->email;
            $employee->password = bcrypt($request->password);
            $employee->phone = $request->phone ?? '';
            $employee->department_id = $request->department_id;

            if ($employee->save()) {
                return response()->json(['message' => 'Employee created successfully!'], Response::HTTP_OK);
            }

            return response()->json(['message' => 'Failed to create employee!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|max:100',
                'last_name' => 'required|max:100',
                'email' => 'required|max:100|email',
                'password' => 'required|max:100',
                'phone' => 'max:30',
                'department_id' => 'required',
            ]);

            $department = Department::find($request->department_id);
            if (!$department) {
                return response()->json(['message' => 'Department not found!'], Response::HTTP_NOT_FOUND);
            }

            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json(['message' => 'Employee not found!'], Response::HTTP_NOT_FOUND);
            }

            $employee->first_name = $request->first_name;
            $employee->last_name = $request->last_name;
            $employee->email = $request->email;
            $employee->password = bcrypt($request->password);
            $employee->phone = $request->phone ?? '';
            $employee->department_id = $request->department_id;

            if ($employee->save()) {
                return response()->json(['message' => 'Employee updated successfully!'], Response::HTTP_OK);
            }

            return response()->json(['message' => 'Failed to update employee!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found!'], Response::HTTP_NOT_FOUND);
        }

        if ($employee->delete()) {
            return response()->json(['message' => 'Employee deleted successfully!'], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Failed to delete employee!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function restore($id)
    {
        $employee = Employee::withTrashed()->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found!'], Response::HTTP_NOT_FOUND);
        }

        if ($employee->restore()) {
            return response()->json(['message' => 'Employee restored successfully!'], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Failed to restore employee!'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function searchByName($name)
    {
        $employees = Employee::where('first_name', 'like', '%' . $name . '%')->orWhere('last_name', 'like', '%' . $name . '%')->get(['id', 'first_name', 'last_name', 'email', 'phone', 'department_id']);

        if (!$employees) {
            return response()->json(['message' => 'Employee not found!'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['employees' => $employees], Response::HTTP_OK);
    }

}
