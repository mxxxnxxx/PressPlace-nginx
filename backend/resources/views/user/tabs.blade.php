<div class="container">
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
        <h2 class="text-center">{{ $user->name }}</h2>
        <ul class="nav nav-tabs nav-justified mt-5 mb-2">
            <li class="nav-item nav-link {{ Request::is('user/followers') ? 'active' : '' }}">
                <a href="{{ route('followers', ['id' => $user->id]) }}" class="">
                    フォロワー<br>
                    <div class="badge badge-secondary">
                        {{ $count_followers }}
                    </div>
                </a>
            </li>
            <li class="nav-item nav-link {{ Request::is('user/followings') ? 'active' : '' }}">
                <a href="{{ route('followings', ['id' => $user->id]) }}" class="">
                    フォロー中<br>
                    <div class="badge badge-secondary">
                        {{ $count_followings }}
                    </div>
                </a>
            </li>
        </ul>
        </div>
        <div class="col-2"></div>
    </div>
</div>
