<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Category;
use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Http\Requests\CategorySoftDeleteRequest;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\ChangeCategoryRequest;
use App\Http\Requests\ColumnOrderUpdateRequest;
use Illuminate\Support\Facades\Auth;
class SoftDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テストユーザ作成
        $this->user = factory(User::class)->create();
        $this->category1 = factory(Category::class)->create([
    'name' => 'No Category',
    'user_id' => $this->user->id,
    ]);
        $this->category2 = factory(Category::class)->create([
    'name' => 'testCategory',
    'user_id' => $this->user->id,
    ]);
        $this->place1 = factory(Place::class)->create([
    'name' => '1番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category1->id,
    'category_order' => 0,
    ]);
        $this->place2 = factory(Place::class)->create([
    'name' => '2番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category1->id,
    'category_order' => 1,
    ]);
        $this->place3 = factory(Place::class)->create([
    'name' => '3番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category1->id,
    'category_order' => 2,
    ]);

        $this->place4 = factory(Place::class)->create([
    'name' => '1番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category2->id,
    'category_order' => 0,
    ]);
        $this->place5 = factory(Place::class)->create([
    'name' => '2番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category2->id,
    'category_order' => 1,
    ]);
        $this->place6 = factory(Place::class)->create([
    'name' => '3番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category2->id,
    'category_order' => 2,
    ]);
    }

    /**
     * A basic feature test example.
     */
    public function testSoftDelete(): void
    {
        $this->actingAs($this->user);
        $request = [
        'categoryId' => $this->category2->id,
        'placeIds' => [
            $this->place4->id,
            $this->place5->id,
            $this->place6->id
            ],
        ];
        // 1番目を4番目に移動できるかのtest
        $response = $this->json(
            'post',
            '/api/category/delete',
            $request
        );

        $response->assertStatus(200);
    }
}
