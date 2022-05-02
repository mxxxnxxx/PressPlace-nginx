<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Category;
use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IndexTest extends TestCase
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
            'category_order' => 2,
        ]);
        $this->place3 = factory(Place::class)->create([
            'name' => '3番目',
            'user_id' => $this->user->id,
            'category_id' => $this->category->id,
            'category_order' => 5,
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
     *
     * category_orderの順番にソートできているかの確認
     */
    public function testIndex(): void
    {
        $this->actingAs($this->user);
        $response = $this->json('get', 'api/user/category');
        $response->assertStatus(200);
    }
}
