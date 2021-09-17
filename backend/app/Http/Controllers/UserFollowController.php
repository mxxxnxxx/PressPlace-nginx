<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserFollowController extends Controller
{
    public function store($id)
    {
    \Auth::user()->follow($id);
    }

    public function destroy($id)
    {
    \Auth::user()->unfollow($id);
    }
}
