# ポートフォリオサイト (hp-otoyabak)

## 概要

ポートフォリオサイトの構築プロジェクトです。Next.js（App Router）をフロントエンドとして使用し、WordPressをヘッドレスCMSとして活用しています。AWS S3を画像ストレージとして使用し、AWS CDKでインフラをコード化しています。

## 技術スタック

### フロントエンド
- **Next.js** 16.0.1 (App Router)
- **React** 19.2.0
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **ESLint** 9.x
- **Google Fonts** (Geist, Geist Mono)
- **Google Tag Manager**

### バックエンド / CMS
- **WordPress** (PHP 8.2)
- **MySQL** 8.0
- **WordPress REST API**
- **カスタムテーマ**: `otoyabak`
- **プラグイン**:
  - Akismet (スパム対策)
  - Amazon S3 and CloudFront (WP Offload Media) - 画像をS3に自動アップロード

### インフラ
- **Docker** & **Docker Compose**
- **AWS CDK** (TypeScript)
- **AWS S3** (画像ストレージ)
- **AWS IAM** (ユーザー/ポリシー管理)

### 連携ツール（予定/検討中）
- n8n
- HubSpot
- Notion
- Asana

## プロジェクト構成

```
hp-otoyabak/
├── apps/
│   ├── web/              # Next.js フロントエンドアプリケーション
│   │   ├── src/
│   │   │   ├── app/      # App Router ページ
│   │   │   ├── components/  # React コンポーネント
│   │   │   ├── lib/      # ユーティリティ（WordPress API連携など）
│   │   │   └── types/    # TypeScript 型定義
│   │   └── package.json
│   └── cms/              # WordPress CMS
│       ├── Dockerfile
│       └── wp-content/
│           └── themes/
│               └── otoyabak/  # カスタムテーマ
├── infra/                # AWS CDK インフラ定義
│   ├── lib/
│   │   └── hp-otoyabak-data-stack.ts  # S3バケット、IAM定義
│   └── package.json
└── docker-compose.yml    # ローカル開発環境
```

## 要件

- **Node.js**: v20
- **npm**: v10
- **Docker**: 24+
- **docker compose**: v2+
- **その他**: make（任意）

## クイックスタート（開発）

```bash
# 1) 依存関係のインストール
cp .env.local .env  # 環境変数ファイルをコピー（必要に応じて編集）
cd apps/web && npm install
cd ../../infra && npm install

# 2) Docker Composeでサービス起動
docker compose up -d

# 3) アプリケーションにアクセス
open http://localhost:3000

# 4) WordPress管理画面にアクセス（必要に応じて）
open http://localhost:8080/wp-admin
```

## 環境変数

環境変数は`.env`（アプリ）と`wp/.env`（WordPress）などに分割して管理します。値は1Password/Secrets Managerを参照してください。

### Next.js アプリケーション

| 変数 | 例 | 用途 |
| ---- | ---- | ---- |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | フロントエンドURL |
| `WORDPRESS_API_URL` | `http://wordpress/wp-json` | WordPress REST API URL |
| `ENV` | `local` | 環境名（local/stage/prod） |
| `HUBSPOT_API_KEY` | `***` | HubSpot 連携（予定） |
| `NOTION_TOKEN` | `***` | Notion 連携（予定） |
| `ASANA_TOKEN` | `***` | Asana 連携（予定） |

### WordPress

| 変数 | 例 | 用途 |
| ---- | ---- | ---- |
| `WORDPRESS_DB_HOST` | `db:3306` | MySQL ホスト |
| `WORDPRESS_DB_USER` | `wpuser` | MySQL ユーザー |
| `WORDPRESS_DB_PASSWORD` | `wppass` | MySQL パスワード |
| `WORDPRESS_DB_NAME` | `wordpress` | MySQL データベース名 |
| `AWS_ACCESS_KEY_ID` | `***` | S3アクセス用 |
| `AWS_SECRET_ACCESS_KEY` | `***` | S3アクセス用 |
| `AWS_DEFAULT_REGION` | `ap-northeast-1` | AWS リージョン |
| `AS3CF_BUCKET` | `hp-otoyabak-local-ga0du58fv23gas9bueraga` | S3バケット名 |

## 開発コマンド

### Next.js アプリケーション

```bash
cd apps/web

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番モードで起動
npm run start

# リント
npm run lint
```

### インフラ（AWS CDK）

```bash
cd infra

# TypeScript コンパイル
npm run build

# CDK コマンド実行
npm run cdk -- [cdk-command]

# 例: スタック一覧
npm run cdk -- list

# 例: デプロイ
npm run cdk -- deploy
```

## インフラ構成

AWS CDKで以下のリソースを管理しています：

- **S3バケット**: 画像ストレージ（環境ごとに作成）
  - 命名規則: `hp-otoyabak-{env}-ga0du58fv23gas9bueraga`
  - 例: `hp-otoyabak-local-ga0du58fv23gas9bueraga`
- **IAMユーザー**: S3アクセス用
  - 命名規則: `hp-otoyabak-{env}-user`
- **IAMポリシー**: S3専用アクセス権限

### 環境

- `local`: ローカル開発環境
- `stage`: ステージング環境
- `prod`: 本番環境

## デモ / 本番URL

- Staging: https://stg.example.com
- Production: https://www.example.com

## 主要機能

- **作品一覧・詳細ページ**: WordPressのカスタム投稿タイプ `work` を表示
- **スキル一覧ページ**: WordPressのカスタム投稿タイプ `skill` を表示
- **About ページ**: 自己紹介ページ
- **WordPress REST API連携**: ヘッドレスCMSとしてWordPressを使用
- **画像最適化**: Next.js Image コンポーネントとS3連携
- **ISR (Incremental Static Regeneration)**: データの再検証機能

## 参考リンク

- [実装の構築](https://qiita.com/yutaroud/items/20b3cf78a440f5f8c3bc#%E5%AE%9F%E9%9A%9B%E3%81%AE%E6%A7%8B%E7%AF%89)