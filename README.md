# PressPlace

![topImage](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/sphere.png)

## 概要

- 気になるあの人のお気に入りの場所がわかる SNS アプリ
  - 自分用のメモとして場所情報を投稿
  - 他の User の投稿をお気に入りとして保存
  - 気になった User をフォロー
- **_同じ空間を共有できる仲間探しを目的としています_**
- docker､SPA､レスポンシブデザイン､TypeScript 対応済み

  - Link  
    [https://press-place.net/](https://press-place.net/)

---

## 目指した体験

~~バンドマンであればライブハウス､アーティストであれば画廊などそれぞれの**場所**があります｡
ただその業界やバックカルチャーによって実は細分化されていて､ 訪れた場所にいる人々や空間から様々なことを感じ取りその場所が望んだ場所なのか判断をします｡
つまり **誰が集まる場所なのか** いってみないとわからないということです｡~~

- **いかにクリティカルに目的の場所にたどり着けるかが課題だとかんがえました｡**

---

## 最近の追加された機能

## 機能一覧

- 投稿系

  - 投稿
  - 編集
  - 郵便番号自動入力
  - 画像投稿
  - 削除
  - タグ
  - 引用投稿機能

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
  - 新規登録※テスト版のため停止中
  - パスワード変更
  - アカウント削除
- User->投稿 お気に入り機能
- User 間 フォロー機能

- レスポンシブデザイン
- SSL 対応
- CircleCI 対応
- RDS に対応

---

## 使用技術

- ## React v16.2.0
  - React Hook
  - React Hook Form v6.14.2
  - React Query v3.16.0
  - Material UI v4.11.4
- ## Type Script v4.1.3
- ## PHP v7.4.8
- ## Laravel v6.18.35
  - Laravel Mix
  - Laravel Debugbar
- ## Mysql v8.0
- ## Nginx v1.18
- ## docker v20.10.12
  - docker-compose v2.2.3
- ## AWS
  - EC2
    - ロードバランサー
  - VPC
  - S3
  - Route 53
  - ACM
  - RDS

---

## インフラ構成

### app container

- Base image
  - php:7.4.8-fpm
  - composer:2.1

### web container

- Base image
  - nginx:1.18-alpine

## インフラ構図

![インフラ構図](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/PressPlaceNginx.drawio.png)

## ER 図

![ER図](https://github.com/mxxxnxxx/ImageWarehouse/blob/main/PressPlaceNginx/PressPlaceNginxDBNR.png)

## 今後の展望

- NuxtJS に対応
  - SSR に対応し SEO 強化
  - 遷移アニメーションによるアクセシビリティ-の向上
- User の年齢をつかった投稿情報の検索
- テストコードの充実化
- リスト機能の追加

- CloudFront にて CDN 化 S3 のセキュリティーを高める

## 裏テーマ (今後目指している体験)

- **パラレルワールドに迷い込ませたい**
  - 以前まではなんの目的もなく､どこかにふらふら出かけて街に迷い込む体験が多かったんですが今はほとんどしなくなりました｡しかし、その過程で新しい発見があったり人との出会いがあったりして､最近その体験がすごく大切なことに改めて気づきました｡
  - 個人的に同じ空間でも一人一人体験していることが全然違うことにずっと興味があって、
    それを知ることができたらもっと発見があるんだろうなと思っていました｡
    その体験を疑似体験出来るアプリをめざしています｡
  - もっと技術があったらもっとスクロールを立体的にしたり､あえて見づらくしてすることで体験価値を挙げられたら面白いなと思っています｡
    具体的に**webGL**とか使って User に探検してもらえたら面白いなとか妄想しながらつくっています｡
    長文読んで頂き､ありがとうございます｡
