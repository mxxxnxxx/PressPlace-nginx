<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Category;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryStoreTest extends TestCase
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
    'column_order' => 0,
    ]);
    }

    /**
     * A basic feature test example.
     */
    public function testCategoryStore(): void
    {
        $this->actingAs($this->user);
        // 1番目を4番目に移動できるかのtest
        $response = $this->json(
            'post',
            '/api/user/category/new',
            ['name' => 'testCategory']
        );

        $response->assertStatus(200);
    }
}
