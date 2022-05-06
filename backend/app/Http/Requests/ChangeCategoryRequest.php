<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangeCategoryRequest extends FormRequest
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
            'sourcePlaces' => 'array',
            'sourcePlaces.*.id' => 'integer',
            'sourcePlaces.*.newCategoryOrder' => 'integer',
            'destinationPlaces' => 'array',
            'destinationPlaces.*.id' => 'integer',
            'destinationPlaces.*.newCategoryOrder' => 'integer',
            'targetPlaceId' => 'required|integer',
            'destinationCategoryId' => 'required|integer',
        ];
    }
}
