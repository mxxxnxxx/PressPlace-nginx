<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\EmailReset;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ChangeEmailController extends Controller
{
    public function sendChangeEmailLink(Request $request)
    {
        $new_email = $request->address;
        // トークン生成
        $token = hash_hmac(
            'sha256',
            Str::random(40) . $new_email,
            config('app.key')
        );

        // トークンをDBに保存
        // トランザクションをオフにして手動で処理
        DB::beginTransaction();

        try {
            $param = [];
            $param['user_id'] = Auth::id();
            $param['new_email'] = $new_email;
            $param['token'] = $token;
            $email_reset = EmailReset::create($param);

            DB::commit();
            // モデルで定義している変更が確定したことを知らせるメールを送信
            $email_reset->sendEmailResetNotification($token);

            return 'メールアドレスの更新に成功しました';
        } catch (Exception $e) {
            DB::rollback();
            return 'メールアドレスの更新に失敗しました';
        }
    }

    /**
     * メールアドレスの再設定処理.
     *
     * @param Request $request
     * @param [type]  $token
     */
    public function reset(Request $request, $token)
    {
        $email_resets = DB::table('email_resets')
            ->where('token', $token)
            ->first();

        // トークンが存在している、かつ、有効期限が切れていないかチェック
        if ($email_resets && !$this->tokenExpired($email_resets->created_at)) {
        // ユーザーのメールアドレスを更新
            $user = User::find($email_resets->user_id);
            $user->email = $email_resets->new_email;
            $user->save();

            // レコードを削除
            DB::table('email_resets')
                ->where('token', $token)
                ->delete();

            return 'メールアドレスの更新に成功しました';
        }
        // レコードが存在していた場合削除
        if ($email_resets) {
            DB::table('email_resets')
                ->where('token', $token)
                ->delete();
        }
        return 'メールアドレスの更新に失敗しました';
    }

    /**
     * トークンが有効期限切れかどうかチェック.
     *
     * @param string $createdAt
     * @return bool
     */
    protected function tokenExpired($createdAt)
    {
        // トークンの有効期限は60分に設定
        $expires = 60 * 60;
        // Carbon::でCarbonクラスのparseを呼び出し
        // addSecondsで有効期限分の時間を追加
        // isPastで過去かどうかを確認
        // まとめるとトークンが発行されたの時刻+60分の時刻がいまより過去であればtrueを返す
        // つまりtrueであれば有効期限外 falseであれば有効期限ない
        return Carbon::parse($createdAt)->addSeconds($expires)->isPast();
    }
}
