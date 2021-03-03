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

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (User::all()) {
            return response(User::all()->jsonSerialize(), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
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
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        if ($user->save()) {
            // Trigger Registration Complete Event to Send Verification Mail
            event(new Registered($user));
            return response(json_encode(['status' => 'success']), Response::HTTP_CREATED);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
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
        $user = User::findOrFail($id);

        if ($user) {
            $response = [
                'bio' => $user->bio,
                'name' => $user->name,
                'email' => $user->email,
                'gender' => $user->gender,
                'status' => $user->status,
                'date_of_birth' => $user->date_of_birth,
                'cover_photo_path' =>   $user->cover_photo_path,
                'profile_photo_path' => $user->profile_photo_path
            ];
            return response(json_encode($response), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
        }

        

        return response(json_encode($response), Response::HTTP_OK);
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
        $user = User::findOrFail($id);
        $user->bio = $request->bio;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->gender = $request->gender;
        $user->status = $request->status;
        $user->date_of_birth = $request->date_of_birth;
        
        if ($user->save()) {
            return response(json_encode(['status' => 'success']), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
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
            return response(json_encode(['status' => 'success']), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
        }
    }
}
