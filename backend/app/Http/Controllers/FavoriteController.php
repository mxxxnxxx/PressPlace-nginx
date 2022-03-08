<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param mixed                    $placeId
     * @return \Illuminate\Http\Response
     */
    public function store($placeId)
    {
        $place = Place::find($placeId);
        $place->favoriteUsers()->attach(Auth::id());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int   $id
     * @param mixed $placeId
     * @return \Illuminate\Http\Response
     */
    public function destroy($placeId)
    {
        $place = Place::find($placeId);
        $place->favoriteUsers()->detach(Auth::id());
    }
}
