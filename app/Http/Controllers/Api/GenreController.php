<?php

namespace App\Http\Controllers\Api;

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

        return GenreResource::collection($genres);
    }

}
