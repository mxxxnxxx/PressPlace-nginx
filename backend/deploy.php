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
// composerの--no-suggestオプションが利用されるとエラーが起こるので 利用しないバージョンでオーバーライド
set('composer_options', 'install --verbose --prefer-dist --no-progress --no-interaction --optimize-autoloader');

// [Optional] tty で名前をわりあてるか
set('git_tty', false);

// ファイル共有
add('shared_files', []);
add('shared_dirs', []);

// Webサーバーによって書き込み可能か
// 'deploy:writable',のしょりが権限エラーでとまらないようにする
add('writable_dirs', ['bootstrap/cache', 'storage', ' | echo',]);
// デフォルトがsetfacl使うようになっているので環境によって変える
set('writable_mode', "chmod");
// これで多分writable_dirsのパーミッション変えれる
set('writable_chmod_mode', "0755");
set('allow_anonymous_stats', false);

// デプロイ先のサーバー情報をほかファイルで記述 yml形式
inventory('servers.yml');

// コマンドにオプションを作成
// オプションのルールとして任意で値を入れる許可
option('env-update', null, InputOption::VALUE_OPTIONAL, 'update env file.');

// gitクローン時に実行される こと
task('build', function (): void {
    run('cd {{ release_path }} && sudo docker-compose down --rmi all --volumes --remove-orphans');
    run('cd {{ release_path }} && sudo docker-compose up -d --build');
    run('cd {{ release_path }} && sudo docker-compose exec -T app composer install --optimize-autoloader --no-dev');
    run('cd {{ release_path }} && sudo docker-compose exec -T app php artisan key:generate');
    run('cd {{ release_path }} && sudo docker-compose exec -T app php artisan storage:link');
    run('cd {{ release_path }} && sudo docker-compose exec -T app chmod -R 777 storage bootstrap/cache');
    run('cd {{ release_path }} && sudo docker-compose exec -T app chmod -R 777 vendor');
});

// .gitignoreで.envはデプロイされない からのままだと deployerの処理で
// .envがシンボルリンクになり処理dockerFileのコピーの処理でエラーになる
// はじめからプロジェクト内に.envファイルが存在しない場合、空の.envファイルが生成され、それがリンクされるため
//自分の環境はdocker側のサーバー環境変数依存にしているので合わせる
// 回避するため実装

task('copy:env', function (): void {
    if (input()->hasOption('env-update')) {
        $update = input()->getOption('env-update');

        if ($update == 'true') {
            dump('{{ release_path }}');
            $stage = get('stage');
            dump($stage);
            $src = ".env.${stage}";
            dump($src);
            $path = get('deploy_path');
            dump($path);
            $shared_path = "${path}/shared";
            dump($shared_path);
            // bashのif文で条件分岐 -e は ファイルが存在するか
            run("if [ -e $(echo ${shared_path}/sever-env/.env ) ]; then cp ${shared_path}/sever-env/.env {{ release_path }}/.env; fi");
            run("if [ -e $(echo ${shared_path}/backend-env/.env ) ];
                then cp ${shared_path}/backend-env/.env {{ release_path }}/backend/.env; fi");
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
    // 'deploy:writable',docker側で処理 ※可読性の維持のため残します
    // 'deploy:vendors', // docker側で処理 ※可読性の維持のため残します
    'deploy:clear_paths',
    'deploy:symlink', // シンボリックリンク差し替えるTask
    'deploy:unlock', // デプロイのlockを解除するTask
    'cleanup', // 前リリースバージョンを削除するTask
    'success',
]);
// タイミングをしていすることでかいひ

before('deploy:shared', 'copy:env');
// // deploy:vendorsの後にTaskを実行
// after('deploy:vendors', 'php:run');
// シンボリックリンクの新しいリリースの前にデータベースを移行する。
before('deploy:symlink', 'artisan:migrate');
// [Optional] デプロイが失敗した場合、自動的にロックが解除される
after('deploy:failed', 'deploy:unlock');
// release_pathに作業ディレクトリとして/backendを設定。
after('deploy:shared', 'build');
// task('set_release_path', function (): void {
//     $newReleasePath = get('release_path') . '/backend';
//     set('release_path', $newReleasePath);
// });
// task('php:run', function (): void {
//     run('cd {{ release_path }} && composer dump-autoload'); // オートローディングに関する情報ファイルを生成
//     run('cd {{ release_path }} && php artisan htaccess:ip'); // DBから取得したIPアドレスをhtaccessに追記するコマンド（スクラッチ）
// });
