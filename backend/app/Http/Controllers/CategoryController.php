<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\CategorySoftDeleteRequest;
use App\Http\Requests\CategoryStoreRequest;
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

    /**
     * カテゴリー新規作成.
     *
     * $firstCreateCheckで同じ名前のカテゴリーを設定できなくしています
     *
     * @param CategoryStoreRequest $request 'name' => 'required|string|max:15',
     *
     * @return  \Illuminate\Http\JsonResponse
     */
    public function store(CategoryStoreRequest $request)
    {
        $categoryName = $request->input('name');

        // すでに作ったカテゴリーは作れない
        $firstCreateCheck = Auth::user()->whereHas('categories', function ($category_q) use ($categoryName): void {
            $category_q->where('name', $categoryName);
        })->first();

        if ($firstCreateCheck) {
            return response()->json(['同じ名前のカテゴリーを作成できません'], 500);
        }

        // 作成の処理
        $count = Category::where('user_id', Auth::id())->count();
        $columnOrder = $count + 1;
        \Debugbar::info($columnOrder);
        $newCategory = Category::create([
            'name' => $categoryName,
            'user_id' => Auth::id(),
            'column_order' => $columnOrder,
        ]);

        return response()->json($newCategory);
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
     * カテゴリーのソフトデリート.
     *
     * @param CategorySoftDeleteRequest $request categoryId:integer placeIds:string[]
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function softDelete(CategorySoftDeleteRequest $request)
    {
        $deleteCategoryId = $request->input(('categoryId'));
        $placeIds = $request->input('placeIds');
        if ($placeIds) {
            // ログインユーザーのNo Categoryのidを取得
            $noCategoryId = Category::where('user_id', Auth::id())->where('name', 'No Category')->value('id');



            // No Categoryに所属し､かつ最後尾のplaceの数値を取得 (category_orderが最大のものに+1した値)
            $endLine = Place::where('category_id', $noCategoryId)->max('category_order') + 1;

            for($i=0; $i < count($placeIds); $i++){
                $targetPlace = Place::find($placeIds[$i]);
                // No Categoryの最後尾に続くようにplacesのcategory_orderを変更
                $targetPlace->category_order = $endLine + $i;
                // 削除したカテゴリーのplacesをNo Categoryに変更
                $targetPlace->category_id = $noCategoryId;
                $targetPlace->save();
            }

        }
        Category::find($deleteCategoryId)->delete();
        return response()->json($this->index()->original);
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
