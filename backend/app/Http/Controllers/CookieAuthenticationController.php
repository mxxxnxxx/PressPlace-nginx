<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

final class CookieAuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $rulus = [
            'name' => ['required', 'string', 'max:20', 'unique:users'],
            'age' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ];
        $message = [
            'name.required' => '名前を入力してください',
            'name.string' => '名前が正しい入力ではありません',
            'name.max' => '名前を20文字以内で入力してください',
            'name.unique' => '他のお客様が既にこの名前を登録しています｡他のお名前をご検討ください',
            'age.required' => '年齢を入力してください',
            'age.numeric' => '整数で入力してください',
            'email.required' => 'メールアドレスを入力してください',
            'email.string' => 'メールアドレスが正しい入力ではありません',
            'email.email' => 'メールアドレスが正しい入力ではありません',
            'email.max' => 'メールアドレスを255文字以内で入力してください',
            'email.unique' => '他のお客様が既にこのメールアドレスを登録しています｡他のメールアドレスをご検討ください',
            'password.required' => 'パスワードを入力してください',
            'password.string' => 'パスワードが正しい入力ではありません',
            'password.min' => 'パスワードは8文字以上で入力する必要があります',
        ];
        /** @var Illuminate\Validation\Validator $validator */
        $validator = Validator::make($request->all(), $rulus, $message);

        if ($validator->fails()) {
            $response['errors'] = $validator->errors()->toArray();
            throw new HttpResponseException(response()->json($response, 422));
        }

        $user = User::create([
            'name' => $request->name,
            'age' => $request->age,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Auth::guard()->login($user);

        return response()->json($user['name'], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @throws Exception
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
        'email' => ['required'],
        'password' => ['required'],
        ]);
        $credentials = $request->only('email', 'password');

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            return new JsonResponse(Auth::user()['name']);
        }

        throw ValidationException::withMessages([
        'message' => ['ログインに失敗しました'],
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse(['message' => 'ログアウトしました']);
    }
}
