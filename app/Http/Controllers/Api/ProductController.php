<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        \Log::debug($request->all());

        $sorter = collect($request->sorter);

        $products = Product::filtered($request->filters)->orderBy($sorter->get('target'), $sorter->get('order'))->paginate(21);

        return ProductResource::collection($products)->additional(['current_filters' => processFilters($request)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::where('id', $id)->with(['videos', 'tags'])->first();

        if (!$product)
            return response()->json(['errors' => ['message' => 'Product not found']], 500);

        return new ProductResource($product);
    }
}
