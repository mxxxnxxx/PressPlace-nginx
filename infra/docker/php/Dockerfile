FROM php:7.4.8-fpm

LABEL maintainer="ucan-lab <yes@u-can.pro>"
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

# timezone environment
ENV TZ=Japan \
  # locale
  LANG=ja_JP.UTF-8 \
  LANGUAGE=ja_JP:ja \
  LC_ALL=ja_JP.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

# composer commandインストール
COPY --from=composer:2.1 /usr/bin/composer /usr/bin/composer

# パッケージリストの更新
RUN apt-get update && \
  # gitインストール
  apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales && \
  # アーカイブファイルの削除
  apt-get clean && \
  # パッケージインデックスファイルの削除
  rm -rf /var/lib/apt/lists/* && \
  # en_US.UTF-8を生成
  locale-gen ja_JP.UTF-8 && \
  # ロケール(言語起因の仕様)の適応
  localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
  # php:7.4.8-fpm用のUNIXドメインソケットのディレクトリー作成
  mkdir /var/run/php-fpm && \
  # phpの標準の拡張パッケージをインストールする
  docker-php-ext-install intl pdo_mysql zip bcmath && \
  # タイムアウトの設定を変更
  composer config -g process-timeout 3600 && \
  # 応答が早いミラーサイトのrepoを取得
  composer config -g repos.packagist composer https://packagist.org && \
  # ImageMagick(画像処理の拡張機能)インストールと有効化
  apt-get update && apt-get install -y imagemagick && \
  apt-get install gcc && \
  apt-get install pkg-config && \
  apt-get install libmagickwand-dev -y --no-install-recommends && \
  # GDライブラリの有効化
  docker-php-ext-configure gd --with-freetype --with-jpeg && \
  docker-php-ext-install -j$(nproc) gd

# nginx環境に適応
COPY ./infra/docker/php/php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ./infra/docker/php/php.ini /usr/local/etc/php/php.ini

WORKDIR /work/backend
