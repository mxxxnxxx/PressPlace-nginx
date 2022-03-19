<?php

declare(strict_types=1);

use App\Place;
use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        factory(App\Place::class, 50)->create();
        // テスト版のでもデータ定義
        Place::create([
            'name' => '茶茶 白雨 （チャチャ ユウダチ）',
            'address' => '東京都新宿区新宿3-26-18 カワノビル 6F',
            'comment' => '清潔感のある、洗練された雰囲気と男性女性問わず好評の京都おばんざい料理が楽しめます。',
            'user_id' => 1,
        ])->tags()->attach(1);

        Place::create([
            'name' => 'せい家 高円寺店',
            'address' => '166-0002 東京都杉並区高円寺北３丁目２４−６ フォーラム高円寺 1F',
            'comment' => 'チェーン店ですがここが一番うまいと思います',
            'user_id' => 1,
        ])->tags()->attach(1);

        Place::create([
            'name' => 'マグロマート',
            'address' => '164-0001 東京都中野区中野５丁目５０−３',
            'comment' => 'マグロの珍しい部位を格安でだしてくれます マジでうまい!!マグロ界のAppleやー!!いつもお祝いのときに行きます!',
            'user_id' => 1,
        ])->tags()->attach(1);

        Place::create([
            'name' => 'villains',
            'address' => '杉並区高円寺南3-46-5 コリンズビル103号室.',
            'comment' => 'いまはなき思い出のお店 お世話になりました',
            'user_id' => 2,
        ])->tags()->attach(2);

        Place::create([
            'name' => 'ミキリハッシン',
            'address' => '東京都渋谷区神宮前5-42-1',
            'comment' => '東京って感じのお店初めて行ったときは場所にも驚かされたしお店というより民家に入る感じが興奮しました｡でも店内は服の展示場ってかんじで圧巻でした｡',
            'user_id' => 2,
        ])->tags()->attach(2);

        Place::create([
            'name' => 'Dog(tokyo)',
            'address' => '東京都渋谷区神宮前3-23-3トリニティービルB1',
            'comment' => 'パワーがすごい｡まずは行って体験してほしいお店です｡',
            'user_id' => 2,
        ])->tags()->attach(2);

        Place::create([
            'name' => 'The 3rd.Shibuya',
            'address' => '東京都渋谷区神泉町12-4 アーガス神泉ビル 4階',
            'comment' => 'バースデーパーティーにおすすめのお店',
            'user_id' => 3,
        ])->tags()->attach(3);

        Place::create([
            'name' => 'LOOK UP COFFEE',
            'address' => '〒155-0031 東京都世田谷区北沢2-36-14 ガーデンテラス下北沢 1階',
            'comment' => '休日にまったりできる、下北の穴場｡カフェ友達同士で行くのも良いですが、カウンター席もあり1人で来ている方も多かったので今度一人でふらっと訪れたいなと思いました！',
            'user_id' => 3,
        ])->tags()->attach(3);

        Place::create([
            'name' => '紅茶専門店THÉSIER(テシエ)',
            'address' => '164-0001 東京都中野区中野５丁目５０−３',
            'comment' => '世界でひとつだけの紅茶が作れるお店､紅茶のソムリエさんが、好みや気分に合わせて、たったひとつの紅茶を作ってくれる「ユニゾンメイドティー」というものがあり、とっても気になったので、次はこちらをいただきたいです♬*.*･ﾟ　.ﾟ･*.',
            'user_id' => 3,
        ])->tags()->attach(3);

        Place::create([
            'name' => 'DIC川村記念美術館',
            'address' => '164-0001 東京都中野区中野５丁目５０−３',
            'comment' => 'ロスコルームが衝撃的で、いままでにない美術鑑賞体験ができます',
            'user_id' => 4,
            ])->tags()->attach(4);

        Place::create([
            'name' => '国立新美術館',
            'address' => '106-8558 東京都港区六本木７丁目２２−２',
            'comment' => '美術館に行くことも、美術に親しむことも普段ほとんどありませんが、行ってみたいと言う家族と一緒に初めて行きました。美術館と言えば絵画鑑賞というイメージでしたが、まず建物自体を見ているだけで気分が上がります！外観、内観と現地で体感するとその美しさに魅了されます。',
            'user_id' => 4,
            ])->tags()->attach(4);

        Place::create([
            'name' => '渋谷区松濤美術館',
            'address' => '150-0046 東京都渋谷区松濤２丁目１４−１４',
            'comment' => '展示品とともに建築も楽しめる美術館です',
            'user_id' => 4,
        ])->tags()->attach(4);

        Place::create([
            'name' => '代官山Unit',
            'address' => '150-0021 東京都渋谷区恵比寿西１丁目３４−１７ ZaHOUSE',
            'comment' => '代官山UNIT（だいかんやまユニット）は、東京都渋谷区恵比寿西にあるライブハウス・クラブである。バーなどを併設した、地下3階建の音楽複合施設となっている',
            'user_id' => 5,
        ])->tags()->attach(5);

        Place::create([
            'name' => 'VENT (表参道)',
            'address' => '107-0062 東京都港区南青山３丁目１８−１９',
            'comment' => 'the 音箱',
            'user_id' => 5,
        ])->tags()->attach(5);

        Place::create([
            'name' => 'Contact',
            'address' => '150-0043 東京都渋谷区道玄坂２丁目１０−１２ 新大宗ビル B2',
            'comment' => '入り口分かりづらいけど電話したら丁寧にスタッフさんが教えてくれるし、実際にバーの人も感じのいい人たちだった。音もよくてナンパ目的の人は皆無。皆音を純粋に楽しみに来てる人たちで非常に治安がよく、楽しめる箱だなと感じました！',
            'user_id' => 5,
        ])->tags()->attach(5);

    }
}
