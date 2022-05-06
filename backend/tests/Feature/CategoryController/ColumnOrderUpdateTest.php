<?php

namespace Tests\Feature;

use App\Category;
use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ColumnOrderUpdateTest extends TestCase
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
    'name' => '1番目',
    'user_id' => $this->user->id,
    'category_id' => $this->category2->id,
    'category_order' => 0,
    ]);

    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testColumnOrderUpdate()
    {
        $this->actingAs($this->user);
        $request = ['categoriesQuery' => [
        ['id' => $this->category1->id, 'newColumnOrder' => 1],
        ['id' => $this->category2->id, 'newColumnOrder' => 0],
        ]];
        // 1番目を4番目に移動できるかのtest
        $response = $this->json(
        'post',
        '/api/category/change/changeorder',
        $request
        );

        $response->assertStatus(200);
    }
}
