@extends('layouts.parent')
@include('layouts.head')
@include('layouts.header')
@include('layouts.footer')
@section('content')
  <h1>place情報の編集</h1>
  {!! Form::open(['route' => ['place.update', $place->id], 'method' => 'post','files' => true]) !!}
    {{Form::token()}}
    {{--  場所の名前  --}}
     <div class="form-group">
      {!! Form::label('text', '場所の名前', ['class' => 'control-label']) !!}
      {!! Form::text('name', old('name',$place->name), ['class' => 'form-control']) !!}
    </div>
    {{--  画像投稿  --}}
    <div class="form-group">
      {!! Form::label('file', '画像投稿', ['class' => 'control-label']) !!}
      {!! Form::file('place_image') !!}
    </div>
    {{--  コメント  --}}
    <div class="form-group m-0">
      {!! Form::label('textarea', 'コメント', ['class' => 'control-label']) !!}
      {!! Form::textarea('comment', old('comment',$place->comment), ['class' => 'form-control']) !!}
    </div>
    {{--  住所  --}}
    <div class="form-group m-0">
      {!! Form::label('text', '住所', ['class' => 'control-label']) !!}
      {!! Form::text('address', old('address',$place->address), ['class' => 'form-control']) !!}
    </div>

    {{--  tag  --}}
     <div class="form-group m-0">
      {!! Form::label('textarea', 'tag', ['class' => 'control-label']) !!}
      {!! Form::textarea('tags',old('tags',$place->tags),['class' => 'form-control']) !!}
    </div>

    {{--  投稿ボタン  --}}
    <div class="form-group text-center">
      {!! Form::submit('投稿', ['class' => 'btn btn-primary my-2']) !!}
    </div>
  {!! Form::close() !!}
@endsection