<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enumerations\Article\Status as ArticleStatus;
use App\Article;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        switch ($this->method()) {
            case 'POST':
                return $this->user()->can('store', Article::class);
                break;

            case 'PATCH':
                $article = Article::find($this->route('api.admin.articles.update'));
                return $article && $this->user()->can('update', $article);

            default:
                return true;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'GET':
                return ['status' => ['sometimes', 'nullable', Rule::in(ArticleStatus::get())]];
                break;
            case 'POST':
            case 'PATCH':
                return [
                    'title' => 'required|string',
                    'body' => 'required',
                ];

            default:
                return [];
        }
    }
}
