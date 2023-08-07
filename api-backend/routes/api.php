<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {

    Route::post('/login', [\App\Http\Controllers\LoginController::class, 'login']);
    Route::post('/logout', [\App\Http\Controllers\LoginController::class, 'logout']);
    Route::get('/refresh', [\App\Http\Controllers\LoginController::class, 'refreshToken']);

    /* It is not necessary to pass the 'auth:api' as a parameter
      to the middleware group method, because I are using the JWTAuth
      package to authenticate the user in the class VerifyJWTToken.
    */
    Route::middleware([\App\Http\Middleware\VerifyJWTToken::class])->group(function () {

        /*
        *   Department Routes
        */
        Route::post('/departments', [\App\Http\Controllers\DepartmentController::class, 'store']);
        Route::get('/departments', [\App\Http\Controllers\DepartmentController::class, 'index']);
        Route::get('/departments/{id}', [\App\Http\Controllers\DepartmentController::class, 'show']);
        Route::put('/departments/{id}', [\App\Http\Controllers\DepartmentController::class, 'update']);
        Route::delete('/departments/{id}', [\App\Http\Controllers\DepartmentController::class, 'destroy']);
        Route::post('/departments/restore/{id}', [\App\Http\Controllers\DepartmentController::class, 'restore']);

        /*
        *   Employee Routes
        */
        Route::post('/employees', [\App\Http\Controllers\EmployeeController::class, 'store']);
        Route::get('/employees', [\App\Http\Controllers\EmployeeController::class, 'index']);
        Route::put('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'update']);
        Route::delete('/employees/{id}', [\App\Http\Controllers\EmployeeController::class, 'destroy']);
        Route::post('/employees/restore/{id}', [\App\Http\Controllers\EmployeeController::class, 'restore']);
        Route::get('/employees/{name}', [\App\Http\Controllers\EmployeeController::class, 'searchByName']);

        /*
        *   Task Routes
        */
        Route::post('/tasks', [\App\Http\Controllers\TaskController::class, 'store']);
        Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'index']);
        Route::put('/tasks/{id}', [\App\Http\Controllers\TaskController::class, 'update']);
        Route::delete('/tasks/{id}', [\App\Http\Controllers\TaskController::class, 'destroy']);
        Route::post('/tasks/restore/{id}', [\App\Http\Controllers\TaskController::class, 'restore']);
        Route::get('/tasks/{title}', [\App\Http\Controllers\TaskController::class, 'searchByTitle']);
    });
});
