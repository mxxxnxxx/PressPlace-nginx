<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\ChangeCategoryRequest;
use App\Http\Requests\ColumnOrderUpdateRequest;
use App\Place;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * カテゴリーごとにplacesをcategory_order順に配列にまとめて取得.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // placesをcategory_orderの順番にソートしながら取得
        $categories = Category::where('user_id', Auth::id())->orderBy('column_order')
            ->with(['places' => function ($places_query): void {
                // クロージャを利用してリレーション先でwithを使いplace情報を集める
                $places_query->with(['place_images', 'tags'])
                    ->orderBy('category_order');
            }])
            ->get()
            ->toArray();
        return response()->json($categories);
    }

    public function store(): void
    {
    }

    /**
     * カテゴリーカラムの順番変更を行うメッソド.
     *
     * @param ColumnOrderUpdateRequest $request
     */
    public function columnOrderUpdate(ColumnOrderUpdateRequest $request): void
    {
        $categories = $request->input('categoriesQuery');

        foreach ($categories as $category) {
            Category::where('id', $category['id'])
                ->update(['column_order' => $category['newColumnOrder']]);
        }
    }

    /**
     * placeのカテゴリーの変化を伴った更新処理.
     *
     * @param ChangeCategoryRequest $request
     */
    public function changeCategory(ChangeCategoryRequest $request): void
    {
        // placeのカテゴリーを変える処理
        $destinationCategoryId = $request->input('destinationCategoryId');
        $targetPlaceId = $request->input(('targetPlaceId'));
        Place::where('id', $targetPlaceId)->update(['category_id' => $destinationCategoryId]);
        // 変更前と変更後のカテゴリーの順番を変更する処理
        $sourcePlaces = $request->input('sourcePlaces');
        $destinationPlaces = $request->input('destinationPlaces');

        foreach ($sourcePlaces as $sourcePlace) {
            Place::where('id', $sourcePlace['id'])
                ->update(['category_order' => $sourcePlace['newCategoryOrder']]);
        }

        foreach ($destinationPlaces as $destinationPlace) {
            Place::where('id', $destinationPlace['id'])
                ->update(['category_order' => $destinationPlace['newCategoryOrder']]);
        }
    }

    /**
     * user作成後にuser固有のNoCategoryのレコードを作成.
     */
    public function addNoCategory(): void
    {
        $this->addCategory('No Category');
    }

    /**
     * カテゴリー追加の部分だけ使い回す.
     *
     * @param mixed $category_name
     */
    protected function addCategory(string $category_name): void
    {
        Category::create([
            'name' => $category_name,
            'user_id' => Auth::id(),
        ]);
    }
}
