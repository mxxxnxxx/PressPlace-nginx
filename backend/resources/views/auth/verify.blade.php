@extends('layouts.parent')
@section('title', '検索ページ')
    @include('layouts.head')
    @include('layouts.header')
    @include('layouts.footer')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mt-5">
                <div class="card-header">{{ __('あなたのメールアドレスを確認してください') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('A fresh verification link has been sent to your email address.') }}
                        </div>
                    @endif

                    {{ __('先に進む前に、検証リンクのメールを確認してください。') }}
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('もう一度リクエストを送る場合はクリックしてください') }}</button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
