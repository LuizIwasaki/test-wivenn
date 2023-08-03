<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/', function () {
    return response()->json(['message' => 'Hello World!'], Response::HTTP_OK);
});
Route::post('/login', [\App\Http\Controllers\LoginController::class, 'login']);
Route::get('/employees', [\App\Http\Controllers\EmployeeController::class, 'index']);

Route::middleware([\App\Http\Middleware\VerifyJWTToken::class])->group(function () {

    /*
    *   Department Routes
    */
    Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'store']);
    Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'index']);
    Route::put('/departments/{id}', [\App\Http\Controllers\DepartmentController::class, 'update']);
    Route::delete('/departments/{id}', [\App\Http\Controllers\DepartmentController::class, 'destroy']);
    Route::post('/departments/restore/{id}', [\App\Http\Controllers\DepartmentController::class, 'restore']);

    /*
    *   Employee Routes
    */
    Route::post('/employees', [\App\Http\Controllers\EmployeeController::class, 'store']);
    Route::get('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'index']);
    Route::put('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'update']);
    Route::delete('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'destroy']);
    Route::post('/employees/restore/{id}', [\App\Http\Controllers\EmployeeController::class, 'restore']);

    /*
    *   Task Routes
    */
    Route::post('/tasks', [\App\Http\Controllers\TaskController::class, 'store']);
    Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'index']);
    Route::put('/tasks/{id}', [\App\Http\Controllers\TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [\App\Http\Controllers\TaskController::class, 'destroy']);
    Route::post('/tasks/restore/{id}', [\App\Http\Controllers\TaskController::class, 'restore']);
});
