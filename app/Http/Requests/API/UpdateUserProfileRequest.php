<?php

namespace App\Http\Requests\API;

use App\User;
use Auth;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateUserProfileRequest
 */
class UpdateUserProfileRequest extends APIRequest
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
        $loginUserId = Auth::user()->id;
        $rules = User::$updateRules;
        $rules['email'] = 'required|unique:users,email,'.$loginUserId;

        return $rules;
    }
}
