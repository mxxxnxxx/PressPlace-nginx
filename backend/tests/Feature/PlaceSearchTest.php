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

class PlaceSearchTest extends TestCase
{
    /**
     * @test
     */
    // use RefreshDatabase;

    // public function setup(): void
    // {
    //     parent::setUp();

    // }

    public function 再検索()
    {
        // dd(env('APP_ENV'));
        // dd(env('DATABASE_URL'));
        // dd(env('DB_CONNECTION'));
        // dd(env('DB_DATABASE'));
        // dd(env('DB_HOST'));
        $params = [
            'page' => 1,
            'InputsData' => [
                'name' => 'iu',
                'address' => '',
                'comment' => '',
                'tag' => ['']
            ]
        ];


        $response = $this->get('/api/places/search', $params);
        $response->assertStatus(200);
    }
}
