<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceRequest extends FormRequest
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
            'name' => 'required|string|max:30',
            'comment' => 'string|max:200',
            'address' => 'required|string|max:50',
            'files.*.photo' => 'image|mimes:jpeg,bmp,png|max:15480',
            'tag' => 'string|max:20',
        ];
    }

    public function messages(){
        return [
            "string" =>"文字以外のものが入力されています。",
            "image" => "指定されたファイルが画像ではありません。",
            "mines" => "指定された拡張子（PNG/JPG）ではありません。",
            "max" => "15Ｍを超えています。",
        ];
    }

}
