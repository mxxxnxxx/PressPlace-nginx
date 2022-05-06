<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Category;
use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderNumberUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テストユーザ作成
        $this->user = factory(User::class)->create();
        $this->category = factory(Category::class)->create([
            'name' => 'No Category',
        'user_id' => $this->user->id,
        ]);
        $this->place1 = factory(Place::class)->create([
        'name' => '1番目',
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'category_order' => 0,
    ]);
        $this->place2 = factory(Place::class)->create([
        'name' => '2番目',
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'category_order' => 1,
    ]);
        $this->place3 = factory(Place::class)->create([
        'name' => '3番目',
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'category_order' => 2,
    ]);
        $this->place4 = factory(Place::class)->create([
        'name' => '4番目',
        'user_id' => $this->user->id,
        'category_id' => $this->category->id,
        'category_order' => 3,
    ]);
    }

    /**
     * A basic feature test example.
     */
    public function testOrderNumberUpdate(): void
    {
        $this->actingAs($this->user);
        $request = ['placesQuery' => [
            ['id' => $this->place1->id, 'newCategoryOrder' => 3],
            ['id' => $this->place2->id, 'newCategoryOrder' => 0],
            ['id' => $this->place3->id, 'newCategoryOrder' => 1],
            ['id' => $this->place4->id, 'newCategoryOrder' => 2],
        ]];
        // 1番目を4番目に移動できるかのtest
        $response = $this->json(
            'post',
            '/api/category/place/changeorder',
            $request
        );

        $response->assertStatus(200);
    }
}
