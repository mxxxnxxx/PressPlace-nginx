{{-- @extends('layouts.app') --}}
@extends('layouts.parent')
@section('title', $user->name . 'のページ')
    @include('layouts.head')
    @include('layouts.header')
    @include('layouts.footer')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="text-right">
                    @auth
                        @if ($user->id === $login_user_id)
                            <a href={{ route('user.edit', ['user' => Auth::user()->id]) }}
                                class="profile_editing">プロフィール編集</a>
                        @endif
                    @endauth
                </div>
                <div class="text-center m-3" style="height: 100px;">
                    <img src="{{ asset('storage/user_image/' . $user->user_image) }}" alt="プロフィール画像" class="h-100">
                </div>

                @include('layouts.follow_button',['user'=>$user])

                @include('user.tabs',['user'=>$user])

                <div class="user_introduction mt-5 text-center border bo">
                    <div class="border-bottom">自己紹介</div>
                    @if (!empty($user->introduction))
                        <div class="user_introduction_in mt-2">{{ $user->introduction }}</div>
                    @else
                        @auth
                            @if ($user->id === $login_user_id)
                                <a href={{ route('user.edit', ['user' => Auth::user()->id]) }}>自己紹介を書く</a>
                            @endif
                        @endauth
                    @endif
                </div>

                @include('layouts.place_list')
                @include('layouts.swiper')
            </div>
            <div class="col-1"></div>
        </div>
    </div>

@endsection
