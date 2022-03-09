<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShowTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テストユーザ作成
        $this->user = factory(User::class)->create();
        $this->place = factory(Place::class)->create(['user_id' => $this->user->id]);
    }

    public function testShow(): void
    {
        $response = $this->json('get', 'api/place/1');
        $response->assertStatus(200);
    }
}
