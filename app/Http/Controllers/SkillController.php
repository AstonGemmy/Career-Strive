<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Models\Skill;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Skill::all()->count()) {
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => Skill::all()->jsonSerialize()
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
            'time_management' => 'required',
            'team_work' => 'required',
            'problem_solving' => 'required',
            'customer_service' => 'required'
        ]);

        $skill = new Skill();
        $skill->id = $request->id;
        $skill->time_management = $request->time_management;
        $skill->team_work = $request->team_work;
        $skill->problem_solving = $request->problem_solving;
        $skill->customer_service = $request->customer_service;

        if ($skill->save()) {
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

            $skill = Skill::findOrFail($id);
            
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => $skill->jsonSerialize()
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
            
            $skill = Skill::findOrFail($id);

            $skill->time_management = $request->time_management;
            $skill->team_work = $request->team_work;
            $skill->problem_solving = $request->problem_solving;
            $skill->customer_service = $request->customer_service;

            if ($skill->save()) {
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'contents updated!',
                    'data' => ''
                ], Response::HTTP_OK);

            } else {
                
                return response()->json([
                    'status' => 'failed',
                    'message' => 'contents could not updated!',
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
        if (Skill::destroy($id)) {
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
