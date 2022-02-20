<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlaceRequest;
use App\Place;
use App\User;
use App\Place_image;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \Image;
use \Storage;
use \Debugbar;
use Illuminate\Http\File;

class PlaceController extends Controller
{

    // 郵便番号検索
    public function postal_search(Request $request)
    {
        // 順番でfirst_code,last_codeをそれぞれ$last_code , $first_codeとしてわたしている
        return \App\PostalCode::whereSearch($request->first_code, $request->last_code)->first();
    }

    // データベースへ保存
    public function store(PlaceRequest $request)
    {
        $place = Place::create([
            'user_id' => Auth::id(),
            'name'    => $request->name,
            'comment' => $request->comment,
            'address' => $request->address
        ]);
        // 画像の処理
        // 一枚目の写真がなければ処理をしない
        if ($request->place_image_0) {
            $count = count($request->file());
            for ($i = 0; $i < $count; $i++) {
                $place_image = "place_image_{$i}";
                $img = $request->file($place_image);
                $path = Storage::disk('s3')->putFile('place_images', $img, 'public');
                $place->place_images()->create(['image_path' => $path]);
            };
        }
        // tagの処理
        // preg_match_allを使用してからの'スペース'の要素を除外し$matchを作成
        preg_match_all('/([a-zA-z0-9０-９ぁ-んァ-ヶ亜-熙]+)/', $request->tags, $match);
        // 受けようの配列を定義しnameカラムへ保存される値を受ける
        $tags = [];

        // $matchの中でも#が付いていない方を使用する(配列番号で言うと1)
        foreach ($match[1] as $tag) {
            // firstOrCreateでTagモデルからDBにアクセスしtagのnameカラムの重複を防ぎながらタグを作成している。
            // 作ったあとの情報を$recodeで変数として取得している
            $record = Tag::firstOrCreate(['name' => $tag]);
            // 作成された$recodeを受け皿に入れる
            array_push($tags, $record);
        }

        // 多対多の中間テーブル用の記述
        // タグのidを中間テーブにいれるための受け皿
        $tags_id = [];
        //    $tagにはテーブルに入る時の情報もすでにもっているので$tag->idがつかえる
        foreach ($tags as $tag) {
            // Tag::firstOrCreate(['name' => $tag])でつくられたtagのidを取得してplace_tagテーブル用の$tags_idに入れる
            array_push($tags_id, $tag->id);
        }




        // タグはpostがsaveされた後にattachするように。
        // $place（今作った投稿）に紐づけるとするために->tags()でしてい
        // 定義した$placeのid(place_id)と多対多の関係のtag(tag_id)を紐付けるための記述
        $place->tags()->attach($tags_id);

        return $place
        ? response()->json($place, 201)
        : response()->json([], 500);
    }

    public function edit($id)
    {
        $place = Place::find($id);
        // $tags = $place->tags->name;
        return view('place.edit', ['place' => $place
        // , 'tags' => $tags
        ]);
    }

    public function update(PlaceRequest $request)
    {
        $place = Place::find($request->id);
        $place->name = $request->name;
        $place->comment = $request->comment;
        $place->address = $request->address;
        $place->save();

        // 不要な写真の削除
        // 消すデータを特定 array_diffするために配列の形を整える
        $old_s3_path_nest = $place->place_images()->get('image_path')->toArray();
        $old_s3_path_flat = array_map(function ($path) {
            return $path['image_path'];
        }, $old_s3_path_nest);

        $old_place_images = [];
        if ($request->old_place_images) {
            $old_place_images += $request->old_place_images;
        }
        // もともとの写真の配列と更新後の写真を比較
        $delete_s3_path = array_diff($old_s3_path_flat, $old_place_images);
        // $delete_s3_pathをmergeして配列を詰める
        $delete_s3_path_merge = array_merge($delete_s3_path);

        for ($i = 0; $i < count($delete_s3_path_merge); $i++) {
            \Storage::disk('s3')->delete($delete_s3_path_merge[$i]);
            $place->place_images()->where('image_path', $delete_s3_path_merge[$i])->delete();
        }

        // 新しく追加される写真の処理
        $new_count = count($request->file());
        for ($i = 0; $i < $new_count; $i++) {
            $place_image="place_image_{$i}" ;
            $img=$request->file($place_image);
            $path = Storage::disk('s3')->putFile('place_images', $img, 'public');
            $place->place_images()->create(['image_path' => $path]);
        };

        // tagの処理
        // preg_match_allを使用して#タグのついた文字列を取得している多次元配列
        preg_match_all('/([a-zA-z0-9０-９ぁ-んァ-ヶ亜-熙]+)/', $request->tags, $match);
        // 変更後のtagsの受け皿
        $after = [];
        // $matchの中でも#が付いていない方を使用する(配列番号で言うと1)
        foreach ($match[1] as $tag) {
            // firstOrCreateで重複を防ぎながらタグを作成している。
            $record = Tag::firstOrCreate(['name' => $tag]);
            // 受け皿に入れる
            array_push($after, $record);
        }

        // 多対多の中間テーブル用の記述
        // タグのidを中間テーブにいれるための受け皿
        $tags_id = [];
        // 更新前のtagsを新しいidにする処理
        foreach ($after as $tag) {
            // 前のidを $tags_idにいれる
            array_push($tags_id, $tag->id);
        }
        // syncで同期して 紐付けの追加,中間テーブルの値更,新紐付けの解除を同時におこなっている
        $place->tags()->sync($tags_id);


        return $place
        ? response()->json($place, 201)
        : response()->json([], 500);
    }


    // 一覧
    public function index()
    {
        $places = Place::orderBy(Place::UPDATED_AT, 'desc')
        ->with('place_images')
        ->with('user')
        ->with('tags')
        ->paginate(15);

        return $places;
    }
    // 詳細ページ
    public function show($placeId)
    {
        $place = Place::with('place_images', 'user', 'tags', 'favoriteUsers')->find($placeId);
        return $place;
    }

    public function placeFavoriteUsers($placeId)
    {
        $place = Place::find($placeId);
        $favoriteUsers = $place->favoriteUsers()
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->toArray();
        $data=[];
        // Userコントローラーからshowメソッドを呼び出し
        // フォロー状況を読み込み
        $UserController = app()->make('App\Http\Controllers\UserController');
        foreach($favoriteUsers['data'] as $favoriteUser ){
            array_push( $data, $UserController->show($favoriteUser['name']));
        }
        $favoriteUsers['data'] = $data;
        return response()->json($favoriteUsers);
    }

    // ソフトデリート
    public function softdelete($id)
    {
        $place = Place::find($id);
        $place->delete();
        return $this->index();
    }


    public function search(Request $request)
    {
        // データベースから検索
        $places_q = Place::query();
        $InputsData = $request->input('InputsData');
        // React側から届いたInputsDataを分割代入
        [   'name' => $name,
            'address' => $address,
            'comment' => $comment,
            'tags' => $tags
        ] = $InputsData;
        // タグは後で削除された場合react側では' 'でそうしんされて$tagsのだんかいではnullになる

        $places_q->whereHas('tags', function ($places_q) use ($tags) {
        // whereHasで配列がからで検索をかけると該当がなくなるのでifで回避
            foreach ($tags as $tag) {
                // $tagがnullでなければ検索をかける
                if(isset($tag)){
                    $places_q->where('name', 'like', '%' . $tag . '%');
                }
            }
        });


        if (!$name == "") {
            $places_q->where('name', 'like', '%' . $name . '%');
        }
        if (!$address == "") {
            $places_q->where('address', 'like', '%' . $address . '%');
            \Debugbar::info($places_q->all());
        }
        if (!$comment == "") {
            $places_q->where('comment', 'like', '%' . $comment . '%');
        }
        $placeSearched = $places_q
        ->orderBy('created_at', 'desc')
        ->with('place_images')
        ->with('user')
        ->with('tags')
        ->paginate(15);

        return $placeSearched;
    }
}
