<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate(['username' => 'required', 'password' => 'required']);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return new UserResource(Auth::user()->loadMissing(['permissions']));
        }
        
        return response(['message' => 'The provided credentials do not match our records.'], 422);
    }

    public function logout()
    {
        auth()->logout();
    }
}
