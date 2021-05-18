<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Place;
use App\User;
use App\Place_image;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

class UserController extends Controller{
    //ユーザーページ表示を行う記述
    public function show(User $user){
        // 以下でユーザー情報を入手
        $user = User::find($user->id);
        $places = Place::where('user_id', $user->id) //$userによる投稿を取得
            ->orderBy('created_at', 'desc') // 投稿作成日が新しい順に並べる
            ->paginate(15);
        // $place_images = $places->place_images;

        // ログインしているユーザーの情報を取得し編集ボタンの表示有無を変更
        $user_in = \Auth::user();
        if ($user_in) {
            $login_user_id = $user_in->id;
        } else {
            $login_user_id = "";
        }

        $data =[
            'user' => $user,
            'places' => $places,
            'login_user_id' => $login_user_id
        ];
        $data += $this->counts($user);

        // ユーザ情報を元にviewを表示 変数を$dataにまとめてviewに渡している
        return view('user.show', $data);
    }

    // フォローしている人を出す処理
    public function followings($id){
        $user = User::find($id);
        $followings = $user->followings()->paginate(9);

        $data = [
        'user' => $user,
        'users' => $followings,
        ];

        $data += $this->counts($user);

        return view('user.followings', $data);
    }

    // フォローされている人を出す処理
    public function followers($id){
        $user = User::find($id);
        $followers = $user->followers()->paginate(9);

        $data = [
        'user' => $user,
        'users' => $followers,
        ];

        $data += $this->counts($user);

        return view('user.followers', $data);
    }
    
    // ユーザー情報の編集を行う変数に編集したい自分の$idを渡す
    // $idはurlパラメータ
    public function edit($id){

        // メール認証している時だけ
        $this->middleware(['auth', 'verified']);
        
        // 受け取った$idでレコード検索
        $user = Auth::user($id);
        
        return view('user.edit', ['user' => $user ]);

    }

    // 実際にデータベースに情報を更新
    public function update($id, UserRequest $request){

        // 対象レコード取得
        $user = Auth::user();

        // リクエストデータ受取
        $form = $request->all();

        // Intervention Imageでuser_imageを編集
        $profileImage = $request->file('user_image');

        // user_imageがあったら実行
        if ($profileImage) {
            // 上記で定義したsaveUserImageを利用してサイズの変更
            $form['user_image'] = $this->saveUserImage($profileImage, $id);
             // return file name
        }

        // フォームトークン削除
        unset($form['_token']);

        // フォームのメソッドを削除
        unset($form['_method']);

        // レコードアップデート

        $user->fill($form)->save();

        // ユーザーページに戻す
        return redirect(route('user.show',['user'=> $user->id]));

    }

// プラーベートコントローラー内で使うメソッド定義
// 画像を変収集するためのメソッド
    private function saveUserImage($profileImage, $id){

        // get instance
        $img = \Image::make($profileImage);
        // resize
        $img->fit(100, 100, function ($constraint) {
            $constraint->upsize();
        });
        // save
        $file_name = 'profile_' . $id . '.' . $profileImage->getClientOriginalExtension();
        $save_path =  storage_path('app/public/user_image/' . $file_name);
        $img->save($save_path);
        // return file name
        return $file_name;
    }


// ソフトデリート確認画面表示
    public function confirmationSoftdelete(){
        $user = Auth::user();
        return view('user.confirmationSoftdelete', ['user' => $user]);
    }

    // ソフトデリート
    public function softdelete(){
        $user = Auth::user();
        $user->delete();
        return redirect()->to('/');
    }
    
}
