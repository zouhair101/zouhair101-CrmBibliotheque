<?php

namespace App\Http\Requests\API;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateSettingRequest
 */
class UpdateSettingRequest extends FormRequest
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
        $rules = Setting::$rules;
        $rules['key'] = 'required|unique:settings,key,'.$this->route('setting')->id;

        return $rules;
    }
}