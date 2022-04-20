<?php

declare(strict_types=1);

namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'PressPlace');

// Project repository
set('repository', '');

// [Optional] tty で名前をわりあてるか
set('git_tty', false);

// ファイル共有
add('shared_files', []);
add('shared_dirs', []);


// .gitignoreで.envはデプロイされない からのままだと deployerの処理で
// .envがシンボルリンクになり処理dockerFileのコピーの処理でエラーになる

// 回避するため実装

// コマンドにオプションを作成
// オプションのルールとして任意で値を入れる許可
option('env-update', null, InputOption::VALUE_OPTIONAL, 'update env file.');
task('copy:env', function (): void {
    if (input()->hasOption('env-update')) {
        $update = input()->getOption('env-update');

        if ($update == 'true') {
            $stage = get('stage');
            $src = ".env.${stage}";
            $path = get('deploy_path');
            $shared_path = "${path}/shared";
            run("if [ -e $(echo ${shared_path}/.env ) ]; then cp {{ release_path }}/${src} ${shared_path}/.env; fi");
            run("cp {{ release_path }}/${src} {{ release_path }}/.env");
        }
    }
});
// タイミングをしていすることでかいひ

before('deploy:shared','copy:env');
// Webサーバーによって書き込み可能か
add('writable_dirs', []);
set('allow_anonymous_stats', false);

// デプロイ先のサーバー情報をほかファイルで記述 yml形式
inventory('servers.yml');

// gitクローン時に実行される こと
task('build', function (): void {
    ('cd {{ release_path }} && build');
});

// [Optional] デプロイが失敗した場合、自動的にロックが解除される
after('deploy:failed', 'deploy:unlock');

// シンボリックリンクの新しいリリースの前にデータベースを移行する。
before('deploy:symlink', 'artisan:migrate');

// release_pathに作業ディレクトリとして/backendを設定。
after('deploy:update_code', 'set_release_path');
task('set_release_path', function (): void {
    $newReleasePath = get('release_path') . '/backend';
    set('release_path', $newReleasePath);
});
