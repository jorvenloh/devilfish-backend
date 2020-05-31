<?php

namespace App\Http\Controllers\Api\Superadmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Privilege;
use App\Http\Resources\PrivilegeResource;
use App\Http\Requests\Superadmin\Privilege\PrivilegeRequest;

class PrivilegeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('index', [Privilege::class]);

        $privileges = Privilege::paginate(10);

        return PrivilegeResource::collection($privileges);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Privilege $privilege)
    {
        $this->authorize('show', [Privilege::class]);

        return new PrivilegeResource($privilege);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PrivilegeRequest $request, Privilege $privilege)
    {
        $privilege->update([
            'enabled' => $request->input('enabled'),
        ]);

        \Log::info([__METHOD__ . ' @ Privilge #' . $privilege->id . ' is updated by Superadmin #' . $request->user()->id . '.', $request->all()]);

        return $this->show($request, $privilege);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        abort(404);
    }
}
