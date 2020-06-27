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
    public function store(ArticleRequest $request)
    {
        $article = Article::create([
            'title' => $request->title,
            'body' => $request->body,
            'status' => ArticleStatus::SAVED
        ]);

        $article->author()->associate($request->user())->save();

        return $article ? response()->json([
            'success' => true,
            'article' => new ArticleResource($article)
        ], 200) : response()->json(['success' => false], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ArticleRequest $request, Article $article)
    {
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
    public function update(ArticleRequest $request, Article $article)
    {
        $newInputs = [];
        if ($request->has('title')) $newInputs['title'] = $request->title;
        if ($request->has('body')) $newInputs['body'] = $request->body;
        if ($request->has('status')) $newInputs['status'] = $request->status;
        if (!empty($newInputs)) $article->update($newInputs);

        return response()->json(['success' => true, 'article' => new ArticleResource($article)], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ArticleRequest $request, Article $article)
    {
        $article->delete();

        \Log::info(__METHOD__ . ' @ Article (' . $article->title . ') is deleted by admin #' . $request->user()->id . '.');

        return response()->json([], 200);
    }
}
