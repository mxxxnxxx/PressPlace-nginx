@extends('layouts.parent')
@section('title', 'アカウント削除')
@include('layouts.head')
@include('layouts.header')
@include('layouts.footer')
@section('content')
  <p>本当に削除しますか？</p>
  <a href={{ route('place.softdelete', ['id' => $place->id]) }}>削除</a>
@endsection