<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Http\Resources\ProductResource;
use App\Http\Requests\ProductRequest;
use App\Enumerations\Product\Status as ProductStatus;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sorter = collect($request->sorter);

        $products = Product::filtered($request->filters)->orderBy($sorter->get('target'), $sorter->get('order'))->paginate(21);

        return ProductResource::collection($products)->additional(['current_filters' => processFilters($request)]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selectOptions(Request $request)
    {
        $products = Product::filtered($request)->get()->take(10);

        $select_options = [];
        foreach ($products as $product) {
            $select_options[] = [
                'value' => $product->id,
                'label' => $product->title,
            ];
        }

        return $select_options;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create([
            'title' => $request->title,
            'type' => $request->type,
            'status' => ProductStatus::SAVED
        ]);

        \Log::info(__Method__ . ' @ Admin #' . $request->user()->id . '. has created product #' . $product->id);

        return response()->json(['product' => new ProductResource($product)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product->load('videos');
        $product->load('images');
        $product->load('crews');
        $product->load('tags');

        return new ProductResource($product);
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
