<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Models\User;

class FileUploadController extends Controller
{
    public function profilePhotoUpload(Request $request, $id)
    {
        try {
        
            $user = User::findOrFail($id);

            if($request->file('profile_photo_path')) {

                $profile_photo_new_name = time().'.'.$request->profile_photo_path->getClientOriginalExtension();
                
                $request->profile_photo_path->move(public_path('images/profile pictures/'), $profile_photo_new_name);
                $user->profile_photo_path = $profile_photo_new_name;
            
                if ($user->save()) {

                    return response()->json([
                        'status' => 'success',
                        'message' => 'profile photo updated!',
                        'data' => ''
                    ], Response::HTTP_OK);

                } else {

                    return response()->json([
                        'status' => 'failed',
                        'message' => 'profile photo not updated!',
                        'data' => ''
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);

                }

            }

        } catch(ModelNotFoundException) {

            return response()->json([
                'status' => 'failed',
                'message' => 'target not found!',
                'data' => ''
            ], Response::HTTP_NOT_FOUND);

        }

    }

    public function coverPhotoUpload(Request $request, $id)
    {
        try {
        
            $user = User::findOrFail($id);

            if($request->file('cover_photo_path')) {

                $cover_photo_new_name = time().'.'.$request->cover_photo_path->getClientOriginalExtension();
                
                $request->cover_photo_path->move(public_path('images/cover photos/'), $cover_photo_new_name);
                $user->cover_photo_path = $cover_photo_new_name;
            
                if ($user->save()) {
                    
                    return response()->json([
                        'status' => 'success',
                        'message' => 'cover photo updated!',
                        'data' => ''
                    ], Response::HTTP_OK);

                } else {
                    
                    return response()->json([
                        'status' => 'failed',
                        'message' => 'cover photo not updated!',
                        'data' => ''
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);

                }

            }

        } catch(ModelNotFoundException) {

            return response()->json([
                'status' => 'failed',
                'message' => 'target not found!',
                'data' => ''
            ], Response::HTTP_NOT_FOUND);

        }
    }

}
