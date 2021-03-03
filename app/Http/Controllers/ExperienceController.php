<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        if (Experience::all()) {
            return response(Experience::all()->jsonSerialize(), Response::HTTP_OK);
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
        if (Experience::find($id)) {
            return response(Experience::findOrFail($id)->jsonSerialize(), Response::HTTP_OK);
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
        $experience = Experience::findOrFail($id);
        $experience->job = $request->job;
        $experience->duration = $request->duration;
        $experience->qualification = $request->qualification;

        if ($experience->save()) {
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
        if (Experience::destroy($id)) {
            return response(json_encode(['status' => 'success']), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
        }
    }
}