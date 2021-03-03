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
            $intended = redirect()->intended('/')->getTargetUrl();

            $response = [
                'status' => 'success',
                'intended_url' => $intended
            ];

            return response(json_encode($response), Response::HTTP_OK);
        }

        $response = [
            'status' => 'failed'
        ];
        return response(json_encode($response), Response::HTTP_OK);

    }

    public function isAuthenticated(Request $request)
    {

        if (Auth::check()) {
            $auth_user_id = Auth::id();
            $response = [
                'status' => 'success',
                'id' => $auth_user_id
            ];

            return response(json_encode($response), Response::HTTP_OK);
        }

        $response = [
            'status' => 'failed' 
        ];
        return response(json_encode($response), Response::HTTP_OK);

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

        $response = [
            'status' => 'success'
        ];

        return response(json_encode($response), Response::HTTP_OK);

    }
}
