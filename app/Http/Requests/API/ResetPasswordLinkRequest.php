<?php

namespace App\Http\Requests\API;

use InfyOm\Generator\Request\APIRequest;

/**
 * Class ResetPasswordLinkRequest
 */
class ResetPasswordLinkRequest extends APIRequest
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
     * @return string
     */
    public function rules()
    {
        $rules['email'] = 'required';
        $rules['url'] = 'required';

        return $rules;
    }
}
