<?php

declare(strict_types=1);

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        factory(User::class, 50)->create();
        User::create([
            'name' => '食べるの大介さん(demo)',
            'age' => 55,
            'email' => 'test1@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'user_image' => 'user_images/user_51.jpg',
            'introduction' => '食べるの大好きです!ずっと食べていたいです!(demo)',
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => '服好きと繋がりたい(代表)(demo)',
            'age' => 22,
            'email' => 'test2@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'user_image' => 'user_images/user_52.jpg',
            'introduction' => '服好きと繋がりたいと考えはじめてつぶやいてたらバズったのは私です｡(仮説) 主に行ったことがある服屋さんをpressします!!(demo)',
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => 'キャフェに住む人(demo)',
            'age' => 55,
            'email' => 'test3@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'user_image' => 'user_images/user_53.jpg',
            'introduction' => 'キャフェを営む50代の男性です｡自分の店は載せませんが｡｡尊敬しているお店をのせていきます｡(demo)',
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => 'サンドの飯よりart好き(demo)',
            'age' => 44,
            'email' => 'test4@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'user_image' => 'user_images/user_54.jpg',
            'introduction' => 'art好きです｡気難しくないので絡んでね｡',
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => 'サックスピストルズ:カスタネット担当(demo)',
            'age' => 55,
            'email' => 'test5@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'user_image' => 'user_images/user_55.jpg',
            'introduction' => 'カスタネットで世界を救う人です｡演奏したことがあるライブハウスを載せます(demo)',
            'remember_token' => Str::random(10),
        ]);
        // testUserを定義
        User::create([
            'name' => 'testUser',
            'age' => 20,
            'email' => 'test@test.mail.com',
            'password' => Hash::make('testPlay'), // この場合、「my_secure_password」でログインできる
            'introduction' => 'テスト用の自己紹介ですご自由に編集してください',
            'remember_token' => Str::random(10),
        ]);
    }
}
