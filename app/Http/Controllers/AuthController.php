<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $intended = redirect()->intended('/profile')->getTargetUrl();

            return response()->json([
                'status' => 'success',
                'message' => 'authentication successful',
                'data' => '',
                'intended_url' => $intended
            ], Response::HTTP_OK);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'authentication not successful',
            'data' => '',
            'intended' => ''
        ], Response::HTTP_NOT_FOUND);

    }

    public function isAuthenticated(Request $request)
    {

        if (Auth::check()) {
            $auth_user_id = Auth::id();
            return response()->json([
                'status' => 'success',
                'message' => 'user is authenticated',
                'data' => [
                    'id' => $auth_user_id
                ]
            ], Response::HTTP_OK);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'user is not authenticated',
            'data' => [
                'id' => ''
            ]
        ], Response::HTTP_NOT_FOUND);

    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'status' => 'success',
            'message' => 'user is logged out',
            'data' => ''
        ], Response::HTTP_OK);

    }
}
