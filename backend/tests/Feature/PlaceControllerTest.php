<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

class PlaceControllerTest extends TestCase
{
    public function testShow(): void
    {
        $response = $this->json('get', 'api/place/2');
        $response->assertStatus(200);
    }

    public function testPlaceFavoriteUsers(): void
    {
        $response = $this->json('get', 'api/place/favorite/users/2');
        $response->assertStatus(200);
    }
}
