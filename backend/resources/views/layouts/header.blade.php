@section('header')
    <header>

        <div id="header">
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        PressPlace
                    </a>

                    <div class="justify-content-center mx-3">
                        <a href={{ route('serch') }}>検索</a>
                    </div>

                    {{-- 新規投稿ボタン --}}
                    @auth
                        <div class="justify-content-center mx-3">
                            <a href={{ route('place.new') }}>新しいお店</a>
                        </div>
                    @endauth


                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>



                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        <ul class="navbar-nav mr-auto">

                        </ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ml-auto">
                            <!-- Authentication Links -->
                            {{-- ログインしていない時のみ --}}
                            @guest
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                                @if (Route::has('register'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                    </li>
                                @endif
                                {{-- 以下がログインしている時のみ --}}
                            @else

                                {{-- <li class="nav-item dropdown"> --}}
                             

                                {{-- <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown"> --}}

                                {{-- マイページへのリンク --}}
                                <li class="nav-item">
                                    <a class="nav-link" href={{ route('user.show', ['user' => auth()->user()->id]) }}>
                                        マイページ
                                    </a>
                                </li>
                                {{-- ログアウトのリンク --}}
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                                        {{ __('ログアウト') }}
                                    </a>
                                </li>

                                {{-- 以下が実際ログアウトさせている記述 --}}
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>

                                {{-- </div> --}}
                                {{-- </li> --}}
                            @endguest
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
@endsection
