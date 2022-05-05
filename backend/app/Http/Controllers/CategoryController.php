<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Category;
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
        \Debugbar::info(Auth::id());
        \Debugbar::info($categories);
        return response()->json($categories);
    }

    public function store(): void
    {
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
