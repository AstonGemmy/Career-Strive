<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Models\User;
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
        if (Contact::all()->count()) {
            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => Contact::all()->jsonSerialize()
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

            $contact = Contact::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'message' => 'contents available!',
                'data' => $contact->jsonSerialize()
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

            // $user = User::findOrFail($id);
            
            $contact = Contact::findOrFail($id);

            $contact->country = $request->country;
            $contact->state = $request->state;
            $contact->address = $request->address;
            $contact->phone = $request->phone;

            if ($contact->save()) {
                
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
        if (Contact::destroy($id)) {
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