<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::get('/', function (){
    return response()->json(['message' => 'Hello World!'], Response::HTTP_OK);
});

Route::get('/employees', [\App\Http\Controllers\EmployeeController::class, 'index']);
