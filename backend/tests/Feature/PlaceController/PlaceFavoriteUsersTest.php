<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlaceFavoriteUsersTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テストユーザ作成
        $this->user = factory(User::class)->create();
        $this->place = factory(Place::class)->create(['user_id' => $this->user->id]);
    }

    public function testPlaceFavoriteUsers(): void
    {
        $this->actingAs($this->user);
        $response = $this->json('get', 'api/place/favorite/users/2');
        $response->assertStatus(200);
    }
}
