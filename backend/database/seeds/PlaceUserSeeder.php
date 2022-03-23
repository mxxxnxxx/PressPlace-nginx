<?php

declare(strict_types=1);

use App\Place;
use App\User;
use Illuminate\Database\Seeder;

class PlaceUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $placesCollectionArray = Place::all();

        $userCollectionArray = User::all();

        // eachメソッドでコレクション型似たいして繰り返し処理
        $userCollectionArray->each(function (User $user) use ($placesCollectionArray): void {
            $randNum = mt_rand(1, 20);
            // お気に入りにしたいplacesのIdをrandom()で1-10個までplacesから選びpluckでidだけ取得しtoArray()で配列として取得
            $userFavoritePlacesIdArray = $placesCollectionArray->random(($randNum))->pluck('id')->toArray();
            // attachの引数に配列を利用することでuser一人が複数のplaceをランダムでお気にに登録する
            $user->favoritePlaces()->attach($userFavoritePlacesIdArray);
        });
    }
}
