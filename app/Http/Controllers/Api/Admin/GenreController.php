<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Genre;
use App\Http\Resources\GenreResource;
use App\Http\Requests\GenreRequest;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $genres = Genre::filtered($request)->get();

        return GenreResource::collection($genres)->additional(['current_filters' => $request->name]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GenreRequest $request)
    {
        $this->authorize('store', [Genre::class]);

        $genre = Genre::create(['name' => $request->name]);

        return response()->json(['genre' => new GenreResource($genre)], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GenreRequest $request, Genre $genre)
    {
        $this->authorize('update', [Genre::class]);

        $genre->update(['name' => $request->name]);

        return response()->json(['genre' => new GenreResource($genre)], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Genre $genre)
    {
        $this->authorize('destroy', [Genre::class]);

        $genre->delete();

        return response()->json([], 200);
    }
}
