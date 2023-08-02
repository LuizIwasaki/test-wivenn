<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/', function (){
    return response()->json(['message' => 'Hello World!'], Response::HTTP_OK);
});

Route::get('/employees', [\App\Http\Controllers\EmployeeController::class, 'index']);
Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'store']);
Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::post('/employees', [\App\Http\Controllers\EmployeeController::class, 'store']);
    Route::get('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'index']);

});
