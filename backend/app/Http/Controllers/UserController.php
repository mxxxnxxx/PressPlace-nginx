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
    public function __construct()
    {
    $this->middleware('auth');
    }
    //ユーザーページ表示を行う記述
    public function show($userId){
        // 以下でユーザー情報を入手
        $user = User::find($userId);
        // ログインしているユーザーの情報を取得し編集ボタンの表示有無を変更
        $user_in = Auth::user();

        if ($user_in->id == $userId) {
            $login_user_id = true;
        } else {
            $login_user_id = false;
        }
        $data =[
            'user' => $user,
            'login_user_id' => $login_user_id
        ];
        $data += $this->counts($user);
        return $data;
    }

    public function otherUserShow($userId){
        \Debugbar::info($userId);
        // 以下でユーザー情報を入手
        $user = User::find($userId);
        // ログインしているユーザーの情報を取得し編集ボタンの表示有無を変更
        $data =[
        'user' => $user,
        ];
        return $data;
    }
    public function userPlaces(Request $request){
            // axiosで送られてきたparamsに悪世する場合は第一引数の変数に配列として入る
            // urlパラメータは第二引数に入る
            $places = Place::where('user_id', $request->input('id'))
            ->orderBy('created_at', 'desc')
            ->with('place_images')
            ->with('user')
            ->with('tags')
            ->paginate(15);
            return $places;
    }

    public function current(){
        return Auth::user();
    }
    // フォローしている人を出す処理
    public function followings($user){
        $user = User::find($user);
        $followings = $user->followings()->paginate(9);

        $data = [
        'user' => $user,
        'users' => $followings,
        ];

        $data += $this->counts($user);

        return view('user.followings', $data);
    }

    // フォローされている人を出す処理
    public function followers($user){
        $user = User::find($user);
        $followers = $user->followers()->paginate(9);

        $data = [
        'user' => $user,
        'users' => $followers,
        ];

        $data += $this->counts($user);

        return view('user.followers', $data);
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
