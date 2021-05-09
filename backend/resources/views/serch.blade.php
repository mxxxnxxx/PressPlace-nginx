@extends('layouts.parent')
@section('title', '検索ページ')
    @include('layouts.head')
    @include('layouts.header')
    @include('layouts.footer')
@section('content')

    <div class="container mt-3">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                {!! Form::open(['route' => 'serched', 'method' => 'get']) !!}
                @csrf
                <div class='form-group'>
                    {!! Form::label('tag', 'タグで検索') !!}
                    {!! Form::text('tag', null, ['class' => 'form-control']) !!}
                </div>
                <div class='form-group'>
                    {!! Form::label('name', '場所の名前で検索') !!}
                    {!! Form::text('name', null, ['class' => 'form-control']) !!}
                </div>
                <div class='form-group'>
                    {!! Form::label('comment', 'コメントで検索') !!}
                    {!! Form::text('comment', null, ['class' => 'form-control']) !!}
                </div>
                <div class='form-group text-center'>
                    {!! Form::submit('検索', ['class' => 'btn btn-outline-primary']) !!}
                </div>
                {!! Form::close() !!}
                <div class="text-center">複数の条件で検索可能</div>
            </div>

            <div class="col-2"></div>
        </div>
    @endsection
