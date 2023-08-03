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

    Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'store']);
    Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'index']);
    Route::post('/employees', [\App\Http\Controllers\EmployeeController::class, 'store']);
    Route::get('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'index']);
});
