<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Contact;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Contact::all()) {
            return response(Contact::all()->jsonSerialize(), Response::HTTP_OK);
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
            'country' => 'required',
            'state' => 'required',
            'address' => 'required',
            'phone' => 'required'
        ]);

        $contact = new Contact();
        $contact->id = $request->id;
        $contact->country = $request->country;
        $contact->state = $request->state;
        $contact->address = $request->address;
        $contact->phone = $request->phone;

        if ($contact->save()) {
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
        if (Contact::findOrFail($id)) {
            return response(Contact::findOrFail($id)->jsonSerialize(), Response::HTTP_OK);
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
        $contact = Contact::findOrFail($id);
        $contact->country = $request->country;
        $contact->state = $request->state;
        $contact->address = $request->address;
        $contact->phone = $request->phone;

        if ($contact->save()) {
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
        if (Contact::destroy($id)) {
            return response(json_encode(['status' => 'success']), Response::HTTP_OK);
        } else {
            return response(json_encode(['status' => 'failed']), Response::HTTP_OK);
        }
    }
}