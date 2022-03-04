# PressPlace

![topImage](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/sphere.png)

## 概要

- 気になるあの人のお気に入りの場所がわかる SNS アプリ
- 自分用のメモとして投稿したり他の User の投稿を保存でき､気になった User をフォローすることも可能
- **_同じ空間を共有できる仲間探しを目的としています_**
- docker､SPA､レスポンシブデザイン､TypeScript 対応済み

  - Link  
    現在メンテナンス中
    <!-- - テスト用アカウント
      メールアドレス：
      パスワード : -->

---

## 目指した課題解決

~~バンドマンであればライブハウス､アーティストであれば画廊などそれぞれの**場所**があります｡
ただその業界やバックカルチャーによって実は細分化されていて､ 訪れた場所にいる人々や空間から様々なことを感じ取りその場所が望んだ場所なのか判断をします｡
つまり **誰が集まる場所なのか** いってみないとわからないということです｡~~

- **いかにクリティカルに目的の場所にたどり着けるかが課題だとかんがえました｡**

---

## 機能一覧

- 投稿系

  - 投稿
  - 編集
  - 郵便番号自動入力
  - 画像投稿
  - 削除
  - タグ

- 検索系
  - 複数ワード検索
  - 検索キーワード保持
  - 保持ワード削除時の再検索
- 一覧系
  - 無限スクロール
  - pagination
  - タイル表示(React Masonry)
- 認証系
  - SPA 認証(sanctum)
  - ログイン
  - 新規登録
  - パスワード変更
  - アカウント削除
- User->投稿 お気に入り機能
- User<->User フォロー機能

- レスポンシブデザイン

---

## 使用技術

- ## React
  - React Hook,
  - React Hook Form,
  - React Query,
  - Material UI
- ## Type Script 4.1.3
- ## PHP 7.4.8
- ## Laravel 6.18.35
  - Laravel Mix
  - Laravel Debugbar
- ## Mysql 8.0
- ## Nginx 1.18
- ## docker 20.10.12
  - docker-compose
- ## AWS
  - EC2
  - VPC
  - S3

---

## インフラ構成

画像挿入

### app container

- Base image
  - php:7.4.8-fpm
  - composer:2.1

### web container

- Base image
  - nginx:1.18-alpine

### db container

- Base image
  - mysql:8.0

## インフラ構図

![インフラ構図](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/PressPlaceNginxInfrastructure.jpg)

## ER 図

![ER図](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/PressPlaceNginxDBNR.png)

## 今後の展望

- テストコードの充実化
- CircleCI 対応
- リスト機能の追加
- RDS に対応
