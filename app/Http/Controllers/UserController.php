<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Faker\Generator;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (User::all()->count()) {
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => User::all()->jsonSerialize()
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'no contents available!',
                'data' => ''
            ], Response::HTTP_OK);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|alpha',
            'email' => 'required|email',
            'password' => 'required'|password
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        if ($user->save()) {
            // Trigger Registration Complete Event to Send Verification Mail
            event(new Registered($user));
            return response()->json([
                'status' => 'success',
                'message' => 'contents saved!',
                'data' => ''
            ], Response::HTTP_CREATED);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'contents not saved!',
                'data' => $request->all()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        try {
            
            $user = User::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => [
                    'bio' => $user->bio,
                    'name' => $user->name,
                    'email' => $user->email,
                    'gender' => $user->gender,
                    'status' => $user->status,
                    'date_of_birth' => $user->date_of_birth,
                    'cover_photo_path' =>   $user->cover_photo_path,
                    'profile_photo_path' => $user->profile_photo_path,
                    'created_at' => $user->created_at
                ]
            ], Response::HTTP_OK);

        } catch(ModelNOtFoundException) {
            
            return response()->json([
                'status' => 'failed',
                'message' => 'contents not available!',
                'data' => ''
            ], Response::HTTP_NOT_FOUND);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {

            $user = User::findOrFail($id);

            $user->bio = $request->bio;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->gender = $request->gender;
            $user->status = $request->status;
            $user->date_of_birth = $request->date_of_birth;

            if ($user->save()) {
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'user updated!',
                    'data' => ''
                ], Response::HTTP_OK);

            } else {

                return response()->json([
                    'status' => 'failed',
                    'message' => 'user could not be updated!',
                    'data' => $request->all()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);

            }
        
        } catch (ModelNotFoundException) {

            return response()->json([
                'status' => 'failed',
                'message' => 'user not found!',
                'data' => $request->all()
            ], Response::HTTP_NOT_FOUND);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (User::destroy($id)) {
            return response()->json([
                'status' => 'success',
                'message' => 'model destroyed!',
                'data' => ''
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'model not destroyed!',
                'data' => ''
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
