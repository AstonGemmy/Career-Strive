<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Models\Test;

use Carbon\Carbon;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Test::all()->count()) {
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => Test::all()->jsonSerialize()
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
            'status' => 'required',
            'started_at' => 'required',
            'submitted_at' => 'required',
            'score' => 'required'
        ]);
        
        $date = Carbon::now()->toDateTimeString();

        $test = new Test();
        $test->id = $request->id;
        $test->status = $request->status;
        $test->started_at = $date;
        $test->submitted_at = $date;
        $test->score = $request->score;

        if ($test->save()) {
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
                
            $test = Test::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => $test->jsonSerialize()
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
        return response()->json([
            'status' => 'failed',
            'message' => 'action forbidden!',
            'data' => $request->all()
        ], Response::HTTP_FORBIDDEN);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Test::destroy($id)) {
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
