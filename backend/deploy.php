<?php

declare(strict_types=1);

namespace Deployer;
use Symfony\Component\Console\Input\InputOption;
require 'recipe/laravel.php';

// プロジェクト名（自分のプロジェクト名を設定）
set('application', 'PressPlace');

// [Optional] gitcloneにttyを割り当てる。デフォルト値はfalse。
set('git_tty', false);

// デプロイ間の共有ファイル/ディレクトリ
add('shared_files', []);
add('shared_dirs', []);

// Webサーバーによる書き込み可能なディレクトリ
add('writable_dirs', []);
set('allow_anonymous_stats', false);

inventory('servers.yml');

// タスク
task('build', function () {
('cd {{ release_path }} && build');
});

// [Optional] デプロイが失敗した場合、自動的にロックが解除される。
after('deploy:failed', 'deploy:unlock');

// シンボリックリンクの新しいリリースの前にデータベースを移行する。
before('deploy:symlink', 'artisan:migrate');
// 本番環境用のenvファイルをコピーする
before('deploy:shared','deploy:copy:env');
//release_pathに作業ディレクトリとして/backendを設定。（自身の作業ディレクトリを指定してください。）
after('deploy:update_code', 'set_release_path');
task('set_release_path', function () {
$newReleasePath = get('release_path') . '/backend';
set('release_path', $newReleasePath);
});

task('deploy:copy:env', function () {
run("cp {{ release_path }}/.env.{{ stage }} {{ deploy_path }}/shared/.env");
});
