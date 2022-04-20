<?php

declare(strict_types=1);

namespace Deployer;

use Symfony\Component\Console\Input\InputOption;

require 'recipe/laravel.php';

// Project name
set('application', 'PressPlace');

set('keep_releases', 10);
// Project repository
set('repository', '');

// [Optional] tty で名前をわりあてるか
set('git_tty', false);

// ファイル共有
add('shared_files', []);
add('shared_dirs', []);

// Webサーバーによって書き込み可能か
add('writable_dirs', ['bootstrap/cache', 'storage']);
set('allow_anonymous_stats', false);

// デプロイ先のサーバー情報をほかファイルで記述 yml形式
inventory('servers.yml');

// コマンドにオプションを作成
// オプションのルールとして任意で値を入れる許可
option('env-update', null, InputOption::VALUE_OPTIONAL, 'update env file.');

// gitクローン時に実行される こと
task('build', function (): void {
    ('cd {{ release_path }} && build');
});

// .gitignoreで.envはデプロイされない からのままだと deployerの処理で
// .envがシンボルリンクになり処理dockerFileのコピーの処理でエラーになる
// はじめからプロジェクト内に.envファイルが存在しない場合、空の.envファイルが生成され、それがリンクされるため
// 回避するため実装

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

task('deploy', [
'deploy:info',
'deploy:prepare', // サーバに接続して、ソースコードを配置するディレクトリを作成するTask
'deploy:lock', // デプロイをlockTask
'deploy:release', // デプロイするソースコードを配置するためのディレクトリを整備するTask
'deploy:update_code', // git cloneでソースを落とすTask
'deploy:shared', // リリースバージョンの共有ディレクトリを設置するTask
'deploy:vendors', // composerをinstallするTask
'deploy:clear_paths',
'deploy:symlink', // シンボリックリンク差し替えるTask
'deploy:unlock', // デプロイのlockを解除するTask
'cleanup', // 前リリースバージョンを削除するTask
'success',
]);
// タイミングをしていすることでかいひ

before('deploy:shared', 'copy:env');
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
task('php:run', function (): void {
    run('cd {{ release_path }} && composer dump-autoload'); // オートローディングに関する情報ファイルを生成
    run('cd {{ release_path }} && php artisan htaccess:ip'); // DBから取得したIPアドレスをhtaccessに追記するコマンド（スクラッチ）
});
