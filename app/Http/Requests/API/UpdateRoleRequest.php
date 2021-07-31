<?php

namespace App\Http\Requests\API;

use App\Models\Role;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateRoleRequest
 */
class UpdateRoleRequest extends APIRequest
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
        $rules = Role::$rules;
        $rules['name'] = 'required|unique:roles,name,'.$this->route('role')->id;

        return $rules;
    }

    /**
     * @return array
     */
    public function messages()
    {
        return Role::$messages;
    }
}
