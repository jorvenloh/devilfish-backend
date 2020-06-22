<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Image;
use App\Product;
use App\Enumerations\Image\Type as ImageType;
use App\Http\Requests\Product\ImageRequest;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ImageRequest $request, Product $product)
    {
        if ($request->hasFile('poster')) {
            if ($request->file('poster')->isValid()) {
                if($product->poster()){
                    $product->poster()->deleteFileInDisk($product->id);
                    $product->poster()->delete();
                }
                $image_file = $request->file('poster');
                $image = Image::createAndStore($image_file, $product->id, 'images_products', ImageType::POSTER);
                $product->images()->save($image);

                return response()->json(['poster' => $product->poster()->getURLPath()], 200);
            }
        }

        return response()->json([], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
