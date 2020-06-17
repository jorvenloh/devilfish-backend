<?php

namespace App\Http\Controllers\Api\Admin\Crew;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Crew;
use App\Tag;
use App\Http\Resources\TagResource;

class TagController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Crew $crew)
    {
        //add new tags
        if ($request->has('tags')) {
            foreach ($request->tags as $tag) {
                $tag = Tag::firstOrCreate(['name' => $tag]);
                if (!$crew->hasTag($tag))
                    $crew->tags()->attach($tag);
            }
        }

        else if ($request->has('sync_tags')) {
            $crew->tags()->sync($request->sync_tags);
        }

        return  response()->json(TagResource::collection($crew->tags), 200);
    }
}
