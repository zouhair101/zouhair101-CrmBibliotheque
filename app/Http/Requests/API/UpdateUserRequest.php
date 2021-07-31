<?php

namespace App\Http\Requests\API;

use App\User;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateUserRequest
 */
class UpdateUserRequest extends APIRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = User::$updateRules;
        $rules['email'] = 'required|unique:users,email,'.$this->route('user')->id;

        return $rules;
    }
}
