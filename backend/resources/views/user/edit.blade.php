@extends('layouts.parent')
@section('title', '編集ページ')
    @include('layouts.head')
    @include('layouts.header')
    @include('layouts.footer')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">

                <div class="text-center m-5">プロフィール編集</div>

                {{-- フォーム --}}

                <form method="post" action="{{ route('user.update', ['user' => $user->id]) }}"
                    enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')
                    <div class="text-center">
                        <label for="user_image">プロフィール画像</label>
                        <div class="text-center" style="height: 100px">
                            <img src="{{ asset('storage/user_image/' . $user->user_image) }}" id="img" class="h-100">
                        </div>
                        <input id="user_image" type="file" name="user_image" onchange="previewImage(this);">
                    </div>

                    <div class="text-center">
                        <label for="name">名前</label>
                        <input type="text" name="name" value="{{ $user->name }}" />
                    </div>


                    <div class="text-center">
                        <label for="introduction">自己紹介</label><br>
                        <textarea name="introduction" rows="4" cols="40">
                                        {{ old('introduction', $user->introduction) }}
                                    </textarea>
                    </div>

                    {{-- エラー --}}

                    @if (count($errors) > 0)
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    @endif


                    {{-- ボタン --}}
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary text-right">変更</button>
                    </div>
                </form>

                {{-- <a href="メールアドレス変更画面へのリンク">メールアドレス変更</a> --}}
                {{-- <a href="パスワード変更画面へのリンク">パスワード変更画面へのリンク</a> --}}
                <div class="text-right">
                    <a href={{ route('user.confirmationSoftdelete', ['user' => $user->id]) }}>アカウントを削除する</a>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
@endsection
