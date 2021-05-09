@extends('layouts.parent')
@include('layouts.head')
@include('layouts.swiper')
@include('layouts.header')
@include('layouts.footer')
@section('content')
    {{-- <h1>{{ $place->name }}</h1> --}}
    {{-- ログインしていてかつそのuserと1対多になっている情報のみ操作可能 --}}


    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <div class="m-4 border rounded">
                {{-- <!-- スライダーのメインコンテナ --> --}}
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {{-- <!-- スライドたち --> --}}
                        @foreach ($place->place_images as $place_image)
                            <div class="swiper-slide">
                                <img class="img-responsive"
                                    src="{{ asset('storage/place_image/' . $place_image->filename) }}" alt="place画像">
                            </div>
                        @endforeach
                    </div>
                    @if (count($place->place_images) >= 2)
                        <div class="swiper-pagination"></div>
                    @endif
                </div>
                <div>
                    <div class="text-center mt-2">投稿者</div>
                    <div class="text-center mx-2">
                        <a href={{ route('user.show', ['user' => $place->user->id]) }}>{{ $place->user->name }}</a>
                    </div>
                </div>
                <div>
                    <div class="text-center mt-2">場所の名前</div>
                    <div class="text-center mx-2">
                        <a href={{ route('place.show', ['id' => $place->id]) }}>
                            {{ $place->name }}
                        </a>
                    </div>

                </div>
                <div>
                    <div class="text-center mt-2">住所</div>
                    <div class="text-center mx-2">{{ $place->address }}</div>
                </div>
                <div>
                    <div class="text-center mt-2">コメント</div>
                    <div class="mx-2">{{ $place->comment }}</div>
                </div>
                <div>
                    <div class="text-center">tag</div>
                    <div class="mx-2 text-center">
                        @foreach ($place->tags as $tag)
                            <span>{{ $tag->name }}</span>
                        @endforeach
                    </div>

                </div>
                <div>
                    <div class="text-center mt-2">投稿日</div>
                    <div class="text-center">{{ $place->created_at }}</div>
                </div>
                @auth
                    @if ($place->user_id === $login_user_id)
                        <a href={{ route('place.edit', ['id' => $place->id]) }}>編集</a>
                        <a href={{ route('place.confirmationSoftdelete', ['id' => $place->id]) }}>消去</a>
                    @endif
                @endauth
                <div>
                    <a href={{ route('place.index') }}>topへ戻る</a>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    @include('layouts.swiper')
@endsection
