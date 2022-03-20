<?php

declare(strict_types=1);

use App\User;
use Illuminate\Database\Seeder;

class UserFollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userCollectionArray = User::all();
        $userCollectionArray->each(function (User $user) use ($userCollectionArray): void {
            $randNum = mt_rand(1, 40);
            $followTargetIds = $userCollectionArray->random($randNum)->pluck('id')->toArray();
            $user->followings()->attach($followTargetIds);
        });
    }
}
