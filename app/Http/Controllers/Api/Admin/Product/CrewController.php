<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Crew;
use App\Http\Requests\Product\CrewRequest;
use App\Http\Resources\CrewResource;
use App\Enumerations\Crew\Role as CrewRoles;

class CrewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CrewRequest $request, Product $product)
    {
        $crews = $product->crews()->orderBy('name', 'asc')->get();

        return CrewResource::collection($crews);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CrewRequest $request, Product $product)
    {
        $product->crews()->attach($request->crew, ['role' => $request->role]);

        return response()->json(['success' => true], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product, Crew $crew)
    {
        if ($request->role)
            $product->crews()->updateExistingPivot($crew->id, ['role' => $request->role]);

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CrewRequest $request, Product $product, Crew $crew)
    {
        if ($product->crews()->detach($crew->id)) {
            return response()->json(['success' => true, 'crews' => CrewResource::collection($product->crews)], 200);
        }

        return response()->json(['success' => false], 500);
    }

    public function roleOptions(Request $request)
    {
        return CrewRoles::selectOptions();
    }


}
