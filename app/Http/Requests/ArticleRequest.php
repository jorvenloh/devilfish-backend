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
                return $this->user()->can('manage', Article::class);
                break;
            case 'DESTROY':
            case 'PATCH':
                $article = $this->route('article');
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
                return [
                    'title' => ['required', 'max:200'],
                    'body' => ['required'],
                ];
            case 'PATCH':
                return [
                    'title' => ['sometimes', 'required', 'max:200'],
                    'body' => ['sometimes', 'required'],
                    'status' => ['sometimes', 'required', Rule::in(ArticleStatus::get())]
                ];

            default:
                return [];
        }
    }
}
