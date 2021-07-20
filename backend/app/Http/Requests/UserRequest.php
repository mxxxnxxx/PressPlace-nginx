<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UserRequest extends FormRequest
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
        return [
            //
            
            'user_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => ['required', 'string', 'max:20', 'unique:users'],
            'age' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function messages()
    {
        return [
            "image" => "指定されたファイルが画像ではありません。",
            "mines" => "指定された拡張子（PNG/JPG/GIF）ではありません。",
            "max" => "2Ｍを超えています。",
        ];
    }
}
