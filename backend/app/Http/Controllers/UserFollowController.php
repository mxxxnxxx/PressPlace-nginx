<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Auth;

class UserFollowController extends Controller
{
    public function store($id): void
    {
        Auth::user()->follow($id);
    }

    public function destroy($id): void
    {
        Auth::user()->unfollow($id);
    }
}
