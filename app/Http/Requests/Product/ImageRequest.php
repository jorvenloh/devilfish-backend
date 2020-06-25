<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use App\Product;
use Illuminate\Validation\Rule;
use App\Enumerations\Image\Type as ImageType;

class ImageRequest extends FormRequest
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
            case 'DESTROY':
            case 'PATCH':
                return $this->user()->can('manage', Product::class);

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
            case 'POST':
                return [
                    'image' => ['required', 'image', 'max:1024'],
                    'type' => ['required', Rule::in(ImageType::get())],
                ];
            default:
                return [];
        }
    }
}
