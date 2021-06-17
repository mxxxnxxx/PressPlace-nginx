<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data){

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
            'email.required'=> 'メールアドレスを入力してください',
            'email.string'=> 'メールアドレスが正しい入力ではありません',
            'email.email'=> 'メールアドレスが正しい入力ではありません',
            'email.max'=> 'メールアドレスを255文字以内で入力してください',
            'email.unique'=> '他のお客様が既にこのメールアドレスを登録しています｡他のメールアドレスをご検討ください',
            'password.required' => 'パスワードを入力してください',
            'password.string' => 'パスワードが正しい入力ではありません',
            'password.min' => 'パスワードは8文字以上で入力する必要があります',
        ];
        
        $validator = Validator::make($data, $rulus, $message);
        
        if($validator->errors()){
         $response['errors'] = $validator->errors()->toArray();
         \Debugbar::info($response);
         throw new HttpResponseException( response()->json( $response, 422 ));
        }

        return $validator;
        // ここを使わず新しく作り分かる方法でメッセージを作成する
        // return Validator::make($data, [
        //     'name' => ['required', 'string', 'max:20', 'unique:users'],
        //     'age' => ['required', 'integer'],
        //     'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        //     'password' => ['required', 'string', 'min:8', 'confirmed'],
        // ]);
    }
    

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'age' => $data['age'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
