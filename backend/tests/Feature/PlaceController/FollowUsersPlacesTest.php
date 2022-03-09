<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FollowUsersPlacesTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テストユーザ作成
        $this->user = factory(User::class)->create();
        $this->another_user = factory(User::class)->create();
        $this->place = factory(Place::class)->create(['user_id' => $this->another_user->id]);
    }

    public function testFollowUsersPlaces(): void
    {
        $this->actingAs($this->user);
        $id = $this->another_user->id;
        $response = $this->json('post', "api/user/${id}/follow");
        $response = $this->json('get', 'api/follow/users/places');
        $response->assertStatus(200);
    }
}
