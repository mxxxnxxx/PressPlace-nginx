<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
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
     * カテゴリー追加の部分だけ使い回す
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
