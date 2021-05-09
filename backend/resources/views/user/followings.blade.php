@extends('layouts.parent')
@include('layouts.head')
@include('layouts.header')
@include('layouts.footer')
@section('content')

            @include('user.tabs',['user'=>$user])

            @include('user.users',['users'=>$users])

@endsection