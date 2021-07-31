<?php

namespace App\Http\Requests\API;

use App\Models\Book;
use InfyOm\Generator\Request\APIRequest;

/**
 * Class UpdateBookRequest
 */
class UpdateBookRequest extends APIRequest
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
        $rules = Book::$rules;
        $rules['isbn'] = 'required|unique:books,isbn,'.$this->route('book')->id;
        $rules['name'] = 'required|unique:books,name,'.$this->route('book')->id;

        return $rules;
    }
}
