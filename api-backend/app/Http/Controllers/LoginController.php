<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials!'], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'token' => $token,
            'type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ], Response::HTTP_OK);
    }
}
