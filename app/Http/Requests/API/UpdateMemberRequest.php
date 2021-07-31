<?php

namespace App\Http\Requests\API;

use App\Models\Member;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateMemberRequest
 */
class UpdateMemberRequest extends APIRequest
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
        $rules = Member::$memberRules;
        $rules['email'] = 'required|unique:members,email,'.$this->route('member')->id;

        return $rules;
    }
}
