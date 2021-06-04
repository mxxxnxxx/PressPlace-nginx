import React, { FC } from 'react';
import { usePlace } from "../../../queries/PlaceQuery"
import Header from '../../../layout/containers/organisms/Header';

type Props = {
    placeId?: string;
}

const Top: FC<Props> = ({ placeId }) => {

    // useQueryでステータスの管理をできるようにする dataからplacesに中身にデータの変数名を変更している
    const { data: places, status } = usePlace()

    if (status === 'loading') {
        return <div className="loader" />
    } else if (status === 'error') {
        return <div className="align-center">データの読み込みに失敗しました｡</div>
    } else if (!places || places.length <= 0) {
        return <div className="align-center">まだplaceは登録されていません｡</div>
    };
    return (
        <>
            {console.log(places)}
            <Header />
            <h1>みんなに場所をpress!!</h1>
            <h2>みんなの場所にも行ってみよう!!</h2>
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        {/* 繰り返しの始まり */}
                        {/* @foreach ($places as $place) */}
                        <ul>
                            {places.map((place, i) => <li key={i}>{place.name}</li>)}
                        </ul>

                        <div className="m-4 border rounded">
                            <div>
                                <div className="text-center mx-2">
                                    {/* 場所の名前と詳細ページのリンク */}
                                    {/* <a href={{ route('place.show', ['id' => $place -> id]) }}>
                                    {{ $place-> name}}
                                </a> */}
                                </div>

                            </div>
                            {/* 画像 */}
                            {/* {{-- < !--スライダーのメインコンテナ --> --}}
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {{-- < !--スライドたち --> --}}
                                @foreach ($place->place_images as $place_image)
                                    <div className="swiper-slide text-center">
                                    <img className="img-responsive"
                                        src="{{ asset('storage/place_image/' . $place_image->filename) }}"
                                        alt="place画像">
                                    </div>
                                @endforeach
                            </div>
                            @if (count($place->place_images) >= 2)
                                <div className="swipe's-pagination"></div>
                            @endif
                        </div> */}
                            <div>

                                <div className="text-center mt-2">投稿者</div>
                                {/* 投稿したユーザー名 */}
                                <div className="text-center mx-2">
                                    {/* <a href={{ route('user.show', ['user' => $place -> user -> id]{{ $place-> user -> name}}</a> */}
                                </div>
                            </div>

                            <div>
                                <div className="text-center mt-2">住所</div>
                                {/* addressの表示 */}
                                {/* <div className="text-center mx-2">{{ $place-> address}}</div> */}
                            </div>
                            <div>
                                <div className="text-center mt-2">コメント</div>
                                {/* コメントの表示 */}
                                {/* <div className="mx-2">{{ $place-> comment}}</div> */}
                            </div>
                            <div>
                                <div className="text-center">tag</div>
                                <div className="mx-2 text-center">
                                    {/* @foreach ($place->tags as $tag)
                                    <span>{{ $tag-> name}}</span>
                                @endforeach */}
                                </div>

                            </div>
                            <div>
                                <div className="text-center mt-2">投稿日</div>
                                {/* <div className="text-center">{{ $place-> created_at}}</div> */}
                            </div>
                        </div>
                        {/* @endforeach */}
                        {/* // {{-- ページネーション --}}
                    // {{ $places-> links()}} */}
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>

        </>
    );
}


export default Top;