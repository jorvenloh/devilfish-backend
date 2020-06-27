<?php

namespace App\Http\Requests\Crew;

use Illuminate\Foundation\Http\FormRequest;
use App\Crew;

class CrewRequest extends FormRequest
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
                return $this->user()->can('store', Crew::class);
                break;
            case 'DESTROY':
            case 'PATCH':
                return $this->user()->can('update', Crew::class);

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
                return ['name' => ['string', 'nullable']];
                break;
            case 'POST':
                return [
                    'name' => ['required','string', 'max:200', 'unique:App\Crew,name'],
                    'description' => ['nullable', 'max:3000'],
                ];
                break;
            case 'PATCH':
                return [
                    'name' => ['sometimes','string', 'max:200', 'unique:App\Crew,name,'.$this->route('crew')->id],
                    'description' => ['sometimes', 'required', 'max:5000'],
                ];

            default:
                return [];
        }
    }
}
