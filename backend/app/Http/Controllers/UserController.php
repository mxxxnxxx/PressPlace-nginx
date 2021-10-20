<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use App\Place;
use App\User;
use App\Place_image;
use Illuminate\Http\Request;


use App\Http\Requests\UserRequest;

class UserController extends Controller{
    //ユーザーページ表示を行う記述
    public function show($userName){
        // 以下で表示させたいユーザー情報を入手
        $user = User::where('name',$userName)->first();
        $login_user_id = null;
        $followState = null;
        // ログインしているユーザーの情報を取得し編集ボタンの表示有無を変更
        if (Auth::user()) {
            $auth = Auth::user();

            if ($auth->name == $userName) {
                $login_user_id = true;
            } else {
                $login_user_id = false;
            }
            // ログインしているユーザーが$userIdでしていしたユーザーをフォローしているか確認
            // Authコントローラーを汚さないためにUserモデルのクラスに記述
            $followState = $user->in_is_following($auth->id);
        }

        $data =[
            'user' => $user,
            'login_user_id' => $login_user_id,
            'followState' => $followState
        ];
        $data += $this->counts($user);
        return $data;
    }

    public function userPlaces(Request $request){
            // axiosで送られてきたparamsに悪世する場合は第一引数の変数に配列として入る
            // urlパラメータは第二引数に入る
            $user = User::where('name',$request->input('userName'))->first();
            $places = Place::where('user_id', $user['id'])
            ->orderBy('created_at', 'desc')
            ->with('place_images')
            ->with('user')
            ->with('tags')
            ->paginate(15);
            return response()->json($places);
    }
    public function favoritePlaces(Request $request){

        $favoritePlaces = Place::whereHas('favoriteUsers',function($query) use($request){
            return $query->where('name',$request->input('userName'));
        })
        ->orderBy('created_at', 'desc')
        ->with('place_images')
        ->with('user')
        ->with('tags')
        ->paginate(15);
        \Debugbar::info($favoritePlaces->toArray());
        return response()->json($favoritePlaces);
    }

    public function current(){
        $authUser = Auth::user()->toArray();
        $favoritePlaces = Auth::user()->favoritePlaces()->get()->toArray();
        $authUser['favoritePlaces'] = $favoritePlaces;
        return response()->json($authUser);
    }

    // フォローしている人を出す処理
    public function followings($userName){
        $user = User::where('name',$userName)->first();
        // ネスト先も配列に変えたいのので all() ではなく toArray() を利用
        $followings = $user->followings()->paginate(9)->toArray();
        // followingsでとくていしIdでshowメドッド繰り返せばuserProfileの配列が作れる
        $data=[];
        foreach($followings['data'] as $following ){
            array_push( $data, $this->show($following['name']));
        }
        $followings['data'] = $data;
        return $followings;
    }

    // フォローされている人を出す処理
    public function followers($userName){

        $user = User::where('name',$userName)->first();
        $followers = $user->followers()->paginate(9)->toArray();

        $data=[];
        foreach($followers['data'] as $follower ){
        array_push( $data, $this->show($follower['name']));
        }
        $followers['data'] = $data;
        return $followers;
    }


    // 実際にデータベースに情報を更新
    public function update(Request $request){
        // formの情報とauthのじょうほうが一致しないと処理をしない

        // 対象レコード取得
        $user = Auth::user();

        // リクエストデータ受取
        $form = $request->all();
        // Intervention Imageでuser_imageを編集
        $userImage = $request->file('user_image');
        // user_imageがあったら実行
        if ($userImage) {
            // 上記で定義したsaveUserImageを利用してサイズの変更
            $form['user_image'] = $this->saveUserImage($userImage);
             // return file name
        }
        if(!$userImage || !$request->input('old_user_image')){
            $user->user_image = 'user_images/default.png';
        }

        // フォームトークン削除
        unset($form['_token']);

        // フォームのメソッドを削除
        unset($form['_method']);

        // レコードアップデート

        $user->fill($form)->save();

        return $user;

    }

// プラーベートコントローラー内で使うメソッド定義
// 画像を変収集するためのメソッド
    private function saveUserImage($userImage){
        // save
        $save_path = Storage::disk('s3')->putFile('user_images', $userImage, 'public');
        // return file name
        return $save_path;
    }

    // ソフトデリート
    public function softdelete(){
        $user = Auth::user();
        \Debugbar::info($user);
        $user->delete();
        return redirect()->to('/');
    }

}
