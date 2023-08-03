<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmployeeController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Hello World!'], Response::HTTP_OK);
    }
}
