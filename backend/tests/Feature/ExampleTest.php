<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Place;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    // public function testBasicTest()
    // {
    //     $response = $this->getJson('api/places');
    //     dd($response);
    //     $response->assertStatus(302);

    // }
    public function testCreatePlace(){
        $date = [
            'user_id' => '1',
            'name'=>'TestPlace',
            'comment'=> 'testComment',
            'address'=> 'testAddress',
            'tag' => 'testTag'
        ];
    $response = $this->postJson('api/places',$date);
    dd($response->json());
    }
    
    public function testEditPlace(){
    $date = [
    'user_id' => '1',
    'name'=>'TestPlace',
    'comment'=> 'testComment',
    'address'=> 'testAddress',
    'tag' => 'testTag'
    ];
    $response = $this->postJson('api/places',$date);
    dd($response->json());
    }
}
