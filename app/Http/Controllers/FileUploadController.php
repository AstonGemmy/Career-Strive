<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class FileUploadController extends Controller
{
    public function profilePhotoUpload(Request $request, $id)
    {
        $user = User::findOrFail($id);
        // $user->cover_photo_path = $request->cover_photo_path;

        if($request->file('profile_photo_path')) {

            $profile_photo_new_name = time().'.'.$request->profile_photo_path->getClientOriginalExtension();
            
            $request->profile_photo_path->move(public_path('images/profile pictures/'), $profile_photo_new_name);
            $user->profile_photo_path = $profile_photo_new_name;
        
            if ($user->save()) {
                return response(json_encode(['status' => 'success']), Response::HTTP_OK);
            } else {
                return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
            }

        }
    }

    public function coverPhotoUpload(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if($request->file('cover_photo_path')) {

            $cover_photo_new_name = time().'.'.$request->cover_photo_path->getClientOriginalExtension();
            
            $request->cover_photo_path->move(public_path('images/profile pictures/'), $cover_photo_new_name);
            $user->cover_photo_path = $cover_photo_new_name;
        
            if ($user->save()) {
                return response(json_encode(['status' => 'success']), Response::HTTP_OK);
            } else {
                return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
            }

        }
    }

}
