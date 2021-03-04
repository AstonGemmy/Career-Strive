<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Models\Experience;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Experience::all()->count()) {
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => Experience::all()->jsonSerialize()
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
            'id' => 'required',
            'job' => 'required',
            'duration' => 'required',
            'qualification' => 'required',
        ]);

        $experience = new Experience();
        $experience->id = $request->id;
        $experience->job = $request->job;
        $experience->duration = $request->duration;
        $experience->qualification = $request->qualification;

        if ($experience->save()) {
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

            $experience = Experience::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => $experience->jsonSerialize()
            ], Response::HTTP_OK);

        } catch(ModelNotFoundException) {
            
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

            $experience = Experience::findOrFail($id);

            $experience->job = $request->job;
            $experience->duration = $request->duration;
            $experience->qualification = $request->qualification;

            if ($experience->save()) {

                return response()->json([
                    'status' => 'success',
                    'message' => 'contents updated!',
                    'data' => ''
                ], Response::HTTP_OK);

            } else {

                return response()->json([
                    'status' => 'failed',
                    'message' => 'contents could not be updated!',
                    'data' => $request->all()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);

            }
        
        } catch(ModelNotFoundException) {

            return response()->json([
                'status' => 'failed',
                'message' => 'target not found!',
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
        if (Experience::destroy($id)) {
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