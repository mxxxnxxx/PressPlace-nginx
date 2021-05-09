<div>
    <div class="container">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                @foreach ($places as $place)
                    <div class="m-4 border rounded">
                        <div>
                            <div class="text-center mx-2">
                                <a href={{ route('place.show', ['id' => $place->id]) }}>
                                    {{ $place->name }}
                                </a>
                            </div>

                        </div>
                        {{-- <!-- スライダーのメインコンテナ --> --}}
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                {{-- <!-- スライドたち --> --}}
                                @foreach ($place->place_images as $place_image)
                                    <div class="swiper-slide text-center">
                                        <img class="img-responsive"
                                            src="{{ asset('storage/place_image/' . $place_image->filename) }}"
                                            alt="place画像">
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
                    </div>
                @endforeach
                {{-- ページネーション --}}
                    {{ $places->links() }}
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</div>
