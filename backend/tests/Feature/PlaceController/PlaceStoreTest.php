<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Place;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PlaceStoreTest extends TestCase
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
        Storage::fake('files');
        $file = UploadedFile::fake()->image('dummy.jpg', 800, 800)->size(3500);
        $response = $this->json('post', 'api/places', [
        'name' => 'demo',
        'comment' => 'demo',
        'address' => 'demo',
        'tags' => 'demo',
        'place_image_0' => $file,
        'place_image_1' => $file,
        'place_image_2' => $file,
    ]);
        $response->assertStatus(201);
    }
}
