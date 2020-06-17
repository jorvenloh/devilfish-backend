<?php

namespace App\Http\Requests\Crew;

use Illuminate\Foundation\Http\FormRequest;

class TagRequest extends FormRequest
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
                return $this->user()->can('store', Crew::class);
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
            case 'PATCH':
                return [
                    'tags' => ['required'],
                ];
            default:
                return [];
        }
    }
}
