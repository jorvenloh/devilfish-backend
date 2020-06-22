<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Http\Resources\TagResource;
use App\Tag;

class TagController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        //add new tags
        if ($request->has('tags')) {
            foreach ($request->tags as $tag) {
                $tag = Tag::firstOrCreate(['name' => $tag]);
                if (!$product->hasTag($tag))
                    $product->tags()->attach($tag);
            }
        }

        else if ($request->has('sync_tags')) {
            $product->tags()->sync($request->sync_tags);
        }

        return  response()->json(TagResource::collection($product->tags), 200);
    }
}
