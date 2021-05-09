<div class="container">
    <div class=" row mt-5 text-center">
        <div class="col-12">

            <div class="main-box clearfix">
                <div class="table-responsive">
                    <table class="table user-list">
                        <thead>
                            <tr>
                                <th>アカウント名</th>
                                <th>自己紹介</th>
                                @auth
                                    <th>フォロー状況</th>
                                @endauth

                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($users as $key => $user)
                                <tr>
                                    <td>
                                        <img src="{{ asset('storage/user_image/' . $user->user_image) }}"
                                            class="h-10" alt="プロフィール画像">
                                            <a href={{ route('user.show', ['user' => $user->id]) }}>{{ $user->name }}</a>
                                    </td>
                                    <td style="width: 20%;">
                                        @if ($user->introduction)
                                            <span class="user-subhead">{{ $user->introduction }}</span>
                                        @else
                                            <span>非公開</span>
                                        @endif
                                    </td>
                                    @auth
                                        <td>
                                            @include('layouts.follow_button',['user'=>$user])
                                        </td>
                                    @endauth
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
