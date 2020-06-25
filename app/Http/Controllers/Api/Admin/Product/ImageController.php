<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Image;
use App\Product;
use App\Enumerations\Image\Type as ImageType;
use App\Http\Requests\Product\ImageRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ImageResource;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Product $product)
    {
        $images = $product->images;

        return ImageResource::collection($images);
    }

    /**
     * Display a listing of the option for creating product image.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Product $product)
    {
        return response()->json(['options' => ImageType::selectOptions()], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ImageRequest $request, Product $product)
    {
        if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                $image_file = $request->file('image');
                $image = Image::createAndStore($image_file, $product->id, 'images_products', $request->type);
                if ($image)
                    if ($product->images()->save($image))
                        $this->determineIfReplacable($product, $image, $request->type);

                return response()->json(['image' => $image->getURLPath()], 200);
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
    public function destroy(ImageRequest $request, Product $product, Image $image)
    {
        if ($image) {
            $image->deleteFileInDisk($product->id);
            $image->delete();
        }
    }

    public function determineIfReplacable(Product $product, Image $image, $type)
    {

        switch ($type) {
            case ImageType::POSTER:
                if ($product->poster()->count() > 1) {
                    $image = $product->images()->where('type', ImageType::POSTER)->oldest()->first();
                    $image->deleteFileInDisk($product->id);
                    $image->delete();
                }
                break;

            default:
                # code...
                break;
        }
    }
}
