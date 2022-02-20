<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Database\Seeders\UsersTableSeeder;
use Database\Seeders\PlaceTableSeeder;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Place;
use App\User;
use UsersTableSeeder as GlobalUsersTableSeeder;

class PlaceControllerTest extends TestCase{

    public function testShow(){
        $response = $this->json('get','api/place/2');
        $response->assertStatus(200);
    }
    public function testPlaceFavoriteUsers(){
        $response = $this->json('get', 'api/place/favorite/users/2');
        $response->assertStatus(200);
    }
}
