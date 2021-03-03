<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        if (Skill::all()) {
            return response(Skill::all()->jsonSerialize(), Response::HTTP_OK);
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
        if (Skill::findOrFail($id)) {
            return response(Skill::findOrFail($id)->jsonSerialize(), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
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
        $skill = Skill::findOrFail($id);
        $skill->time_management = $request->time_management;
        $skill->team_work = $request->team_work;
        $skill->problem_solving = $request->problem_solving;
        $skill->customer_service = $request->customer_service;

        if ($skill->save()) {
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
        if (Skill::destroy($id)) {
            return response(json_encode(['status' => 'success']), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
        }
    }
}
