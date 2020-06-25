<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use App\Enumerations\Crew\Role;
use Illuminate\Validation\Rule;
use App\Product;

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
                    'crew' => ['required', 'exists:App\Crew,id'],
                    'role' => ['required', Rule::in(Role::get())],
                ];
            case 'PATCH':
                return [
                    'role' => ['required', Rule::in(Role::get())],
                ];
            default:
                return [];
        }
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->ifExistedCrewRelation()) {
                $validator->errors()->add('crew', 'This crew member is already existed with relationship '.$this->role);
            }
        });
    }

    public function ifExistedCrewRelation(){
        $product = $this->route('product');
        return $product->crews()->where('id', $this->crew)->wherePivot('role', $this->role)->exists();
    }
}
