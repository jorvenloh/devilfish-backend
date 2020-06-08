<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enumerations\Product\Status as ProductStatus;
use App\Enumerations\Product\Type as ProductType;
use App\Product;

class ProductRequest extends FormRequest
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
            case 'PATCH':
                return $this->user()->can('store', Product::class);
                break;

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
                return ['status' => ['sometimes', 'nullable', Rule::in(ProductStatus::get())]];
                break;
            case 'POST':
            case 'PATCH':
                return [
                    'title' => 'required|string',
                    'type' => ['required', 'string', Rule::in(ProductType::get())]
                ];
                break;

            default:
                return [];
        }
    }
}
