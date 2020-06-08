<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Crew;
use App\Http\Resources\CrewResource;


class CrewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $crews = Crew::filtered($request)->paginate(config('system.default_pagination_number'));

        return CrewResource::collection($crews)->additional(['current_filters' => $request->name]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('store', [Crew::class]);

        $crew = Crew::create([
            'name' => $request->name,
            'description' => $request->description
            ]);

        return response()->json(['crew' => new CrewResource($crew)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Crew $crew)
    {
        return new CrewResource($crew);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Crew $crew)
    {
        $this->authorize('update', [Crew::class]);

        $crew->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json(['crew' => new CrewResource($crew)], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Crew $crew)
    {
        $this->authorize('destroy', [Crew::class]);

        $crew->delete();

        \Log::info(__METHOD__ . ' @ Crew (' . $crew->name . ') is deleted by admin #' . $request->user()->id . '.');

        return response()->json([], 200);
    }
}
