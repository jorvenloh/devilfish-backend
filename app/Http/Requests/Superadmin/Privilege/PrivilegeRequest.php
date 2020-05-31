<?php

namespace App\Http\Requests\Superadmin\Privilege;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use App\Privilege;

class PrivilegeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        switch ($this->method()) {
            case 'PATCH':
                return Gate::allows('update', [Privilege::class]);
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

            case 'PATCH':
                return [
                    'password' => 'required',
                ];

                break;

            default:
                return [];
        }
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            switch ($this->method()) {
                case 'PATCH':
                    if (!(Hash::check($this->input('password'), $this->user()->password))) {
                        $validator->errors()->add('password', 'Invalid password');
                    }
                break;
            }
        });
    }

}
