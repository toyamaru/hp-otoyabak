# ポートフォリオサイトの構築

## 概要
- ポートフォリオサイトを構築しました。
- 対象ユーザー / 主要ユースケース
- 技術スタック: Docker, Next.js (App Router), WordPress(テーマ名), n8n, HubSpot, Notion, Asana, AWS(Aurora PostgreSQL), CDK など

## デモ / 本番URL
- Staging: https://stg.example.com
- Production: https://www.example.com

## 要件
- Node.js: v20
- npm: v10
- Docker: 24+
- docker compose: v2+
- その他: make（任意）

## クイックスタート（開発）
```bash
# 1) 依存関係
cp .env.local .env
npm install        # package-lock.json が無い場合は ci ではなく install
# 2) 起動
docker compose up -d
# 3) アプリ
open http://localhost:3000
# 4) WP（必要なら）
open http://localhost:8080/wp-admin
```

## 環境変数
.env（アプリ）とwp/.env（WordPress）などに分割。値は1Password/Secrets Manager参照。

| 変数 | 例 | 用途 |
| ---- | ---- | ---- |
| NEXT_PUBLIC_BASE_URL | http://localhost:3000 | フロントURL |
| HUBSPOT_API_KEY | *** | HubSpot 連携 |
| NOTION_TOKEN | *** | Notion 連携 |
| ASANA_TOKEN | *** | Asana 連携 |

## 参考
データ[https://qiita.com/yutaroud/items/20b3cf78a440f5f8c3bc#%E5%AE%9F%E9%9A%9B%E3%81%AE%E6%A7%8B%E7%AF%89]



## インフラで作成するもの
IAMユーザー: 
S3バケット: hp-otoyabak-local-ga0du58fv23gas9bueraga