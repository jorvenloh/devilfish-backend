<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Article;
use App\Http\Resources\ArticleResource;
use App\Http\Requests\ArticleRequest;
use App\Enumerations\Article\Status as ArticleStatus;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ArticleRequest $request)
    {
        $this->authorize('index', Article::class);

        $articles = Article::filtered($request)->paginate(config('system.default_pagination_number'));

        return ArticleResource::collection($articles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = Article::create([
            'title' => $request->title,
            'body' => json_encode($request->body),
            'status' => ArticleStatus::SAVED]
        );

        $article->author()->associate($request->user())->save();

        return $article ? response()->json(['success' => true], 200) : response()->json(['success' => false], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Article $article)
    {
        $this->authorize('show', Article::class);

        $article->load('author');

        return new ArticleResource($article);
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
