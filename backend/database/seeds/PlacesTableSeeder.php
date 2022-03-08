<?php

declare(strict_types=1);

use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // testUserを定義
        App\User::create([
        'name' => 'testUser',
        'age' => 20,
        'email' => 'test@test.mail.com',
        'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
        'introduction' => 'テスト用の自己紹介ですご自由に編集してください',
        'remember_token' => Str::random(10),
        ]);

        factory(App\Place::class, 50)->create();
    }
}
